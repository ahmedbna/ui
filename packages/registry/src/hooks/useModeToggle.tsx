import { Mode, useModeContext } from '@/providers/mode-provider';

interface UseModeToggleReturn {
  isDark: boolean;
  mode: Mode;
  setMode: (mode: Mode) => void;
  currentMode: 'light' | 'dark';
  toggleMode: () => void;
}

/**
 * Reads and writes the app-wide theme mode held by `ModeProvider`.
 *
 * The mode deliberately lives in context rather than in this hook: it used to
 * be local `useState` paired with a global `Appearance.setColorScheme` call, so
 * remounting the toggle reset the cycle to `'system'` while the app stayed
 * dark, and two toggles on screen disagreed. Sharing the state also makes the
 * toggle work on web, where `Appearance` is read-only.
 */
export function useModeToggle(): UseModeToggleReturn {
  const context = useModeContext();

  if (!context) {
    throw new Error(
      'useModeToggle requires a <ModeProvider>. Wrap your app in the ' +
        '<ThemeProvider> in providers/theme-provider, which mounts one, or ' +
        'mount <ModeProvider> from providers/mode-provider yourself.'
    );
  }

  const { mode, setMode, scheme } = context;

  const toggleMode = () => {
    switch (mode) {
      case 'light':
        setMode('dark');
        break;
      case 'dark':
        setMode('system');
        break;
      case 'system':
        setMode('light');
        break;
    }
  };

  return {
    isDark: scheme === 'dark',
    mode,
    setMode,
    currentMode: scheme,
    toggleMode,
  };
}
