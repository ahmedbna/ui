import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    if (newMode === 'system') {
      Appearance.setColorScheme(null); // Reset to system default
    } else {
      Appearance.setColorScheme(newMode);
    }
  };

  return {
    isDark,
    mode,
    setMode,
    currentMode: colorScheme,
    toggleMode,
  };
}
