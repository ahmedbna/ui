import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from 'expo-router/react-navigation';
import { useMemo } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/theme/colors';
import { Mode, ModeProvider, ModeStorage } from '@/providers/mode-provider';

type Props = {
  children: React.ReactNode;
  /** Supply to persist the theme choice across launches. Omit and it resets. */
  storage?: ModeStorage;
  storageKey?: string;
  defaultMode?: Mode;
};

/**
 * Mounts `ModeProvider` — the app-wide source of truth for light/dark/system —
 * and maps the resolved scheme onto React Navigation's theme.
 *
 * The navigation half is a separate component because it calls
 * `useColorScheme()`, which has to read that context from *inside* the provider.
 */
export const ThemeProvider = ({
  children,
  storage,
  storageKey,
  defaultMode,
}: Props) => (
  <ModeProvider
    storage={storage}
    storageKey={storageKey}
    defaultMode={defaultMode}
  >
    <NavigationTheme>{children}</NavigationTheme>
  </ModeProvider>
);

const NavigationTheme = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

  // Rebuilding this on every render invalidates every useTheme() consumer
  // app-wide, since ThemeProvider is mounted at the root — memoize on the
  // one thing it actually depends on, and only build the active theme.
  const theme = useMemo(() => {
    if (colorScheme === 'dark') {
      return {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: Colors.dark.primary,
          background: Colors.dark.background,
          card: Colors.dark.card,
          text: Colors.dark.text,
          border: Colors.dark.border,
          notification: Colors.dark.red,
        },
      };
    }

    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: Colors.light.primary,
        background: Colors.light.background,
        card: Colors.light.card,
        text: Colors.light.text,
        border: Colors.light.border,
        notification: Colors.light.red,
      },
    };
  }, [colorScheme]);

  return <RNThemeProvider value={theme}>{children}</RNThemeProvider>;
};
