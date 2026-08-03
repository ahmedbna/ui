import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, useColorScheme as useRNColorScheme } from 'react-native';

export type Mode = 'light' | 'dark' | 'system';

/**
 * The slice of a key/value store this needs. Returns are sync-or-async so a
 * store satisfies it whichever style it exposes — `expo-secure-store` (sync
 * `getItem`/`setItem`) and `AsyncStorage` (promise-returning) both pass
 * unchanged, with no adapter.
 *
 * Keeping it structural is what lets persistence cost an app one prop and this
 * package zero dependencies — nobody installing `useColor` pays for a storage
 * engine they may not want.
 */
export type ModeStorage = {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
};

type ModeContextValue = {
  /** What the app was asked for, including the `'system'` passthrough. */
  mode: Mode;
  setMode: (mode: Mode) => void;
  /**
   * What the app should actually render as. Prefer this over re-deriving it
   * from `mode` — outside `'system'` there is no meaningful system value to
   * fall back to, and on native RN's own `useColorScheme()` reports the
   * override rather than the OS once `setMode` has run.
   */
  scheme: 'light' | 'dark';
};

const ModeContext = createContext<ModeContextValue | null>(null);

const isMode = (value: unknown): value is Mode =>
  value === 'light' || value === 'dark' || value === 'system';

/**
 * Mirrors the override into React Native's global `Appearance` so native chrome
 * follows the toggle too — the status bar, the Android navigation bar, native
 * sheet presentation, and anything reading the OS scheme *above* this provider
 * (root layouts do exactly that to colour the system UI).
 *
 * `Appearance.setColorScheme` landed in React Native 0.73 and react-native-web
 * has never implemented it, so feature-detect rather than assume. On web the
 * context alone drives the theme, which is why the toggle works there without
 * this call.
 */
function syncNativeAppearance(mode: Mode) {
  if (typeof Appearance.setColorScheme !== 'function') return;
  // RN 0.86 replaced the old `null` sentinel ("follow the system") with
  // `'unspecified'`.
  Appearance.setColorScheme(mode === 'system' ? 'unspecified' : mode);
}

type Props = {
  children: React.ReactNode;
  /** Supply to persist the choice across launches. Omit and it resets. */
  storage?: ModeStorage;
  storageKey?: string;
  defaultMode?: Mode;
};

export const ModeProvider = ({
  children,
  storage,
  storageKey = 'bna-ui.mode',
  defaultMode = 'system',
}: Props) => {
  const [mode, setModeState] = useState<Mode>(defaultMode);
  const systemScheme = useRNColorScheme() === 'dark' ? 'dark' : 'light';

  // Rehydrate once. A missing, malformed or unreadable value leaves the default
  // in place — persistence is a convenience and must never be able to break boot.
  //
  // The `Promise.resolve().then(...)` wrapper is doing real work: it normalises
  // sync and async stores into one path, and turns a *synchronous* throw into a
  // rejection `.catch` can see. `expo-secure-store` throws exactly that way on
  // web, where it is unsupported.
  useEffect(() => {
    if (!storage) return;
    let cancelled = false;

    Promise.resolve()
      .then(() => storage.getItem(storageKey))
      .then((saved) => {
        if (cancelled || !isMode(saved)) return;
        setModeState(saved);
        syncNativeAppearance(saved);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [storage, storageKey]);

  const setMode = useCallback(
    (next: Mode) => {
      setModeState(next);
      syncNativeAppearance(next);

      if (storage) {
        Promise.resolve()
          .then(() => storage.setItem(storageKey, next))
          .catch(() => {});
      }
    },
    [storage, storageKey]
  );

  // This sits at the app root, so an unstable value re-renders every themed
  // component in the tree on any parent render.
  const value = useMemo<ModeContextValue>(
    () => ({
      mode,
      setMode,
      scheme: mode === 'system' ? systemScheme : mode,
    }),
    [mode, setMode, systemScheme]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

/**
 * `null` when no `ModeProvider` is mounted, so callers can fall back to the
 * system scheme instead of forcing every app that only wanted `useColor` to
 * mount a provider.
 */
export function useModeContext(): ModeContextValue | null {
  return useContext(ModeContext);
}
