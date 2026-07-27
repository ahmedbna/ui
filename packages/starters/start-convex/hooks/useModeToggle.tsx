import { useColorScheme } from '@/hooks/useColorScheme';
import { useState, useEffect } from 'react';
import { Appearance, ColorSchemeName, Platform } from 'react-native';

type Mode = 'light' | 'dark' | 'system';

interface UseModeToggleReturn {
  isDark: boolean;
  mode: Mode;
  setMode: (mode: Mode) => void;
  currentMode: ColorSchemeName;
  toggleMode: () => void;
}

export function useModeToggle(): UseModeToggleReturn {
  const [mode, setModeState] = useState<Mode>('system');
  const colorScheme = useColorScheme(); // Uses your existing hook

  // Calculate isDark based on mode and system preference
  const isDark = mode === 'system' ? colorScheme === 'dark' : mode === 'dark';

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

  const setMode = (newMode: Mode) => {
    setModeState(newMode);

    // Only use Appearance.setColorScheme on native platforms
    if (Platform.OS !== 'web') {
      if (newMode === 'system') {
        Appearance.setColorScheme(null);
      } else {
        Appearance.setColorScheme(newMode);
      }
    } else {
      // For web, update the root HTML element
      if (typeof document !== 'undefined') {
        const root = document.documentElement;

        if (newMode === 'system') {
          // Remove override and let CSS media query handle it
          root.classList.remove('light', 'dark');
          root.removeAttribute('data-theme');
        } else {
          // Set explicit theme
          root.classList.remove('light', 'dark');
          root.classList.add(newMode);
          root.setAttribute('data-theme', newMode);
        }
      }
    }
  };

  // Sync web theme with mode changes
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const root = document.documentElement;

      if (mode === 'system') {
        root.classList.remove('light', 'dark');
        root.removeAttribute('data-theme');
      } else {
        root.classList.remove('light', 'dark');
        root.classList.add(mode);
        root.setAttribute('data-theme', mode);
      }
    }
  }, [mode, colorScheme]); // Re-run when mode or system preference changes

  return {
    isDark,
    mode,
    setMode,
    currentMode: mode === 'system' ? colorScheme : mode,
    toggleMode,
  };
}
