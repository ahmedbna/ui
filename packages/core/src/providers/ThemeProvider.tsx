import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Theme, ColorScheme } from '../theme/types';
import { lightTheme, darkTheme } from '../theme';
import { useColorScheme } from '../hooks/useColorScheme';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
  defaultColorScheme?: ColorScheme;
  customTheme?: {
    light?: Partial<Theme>;
    dark?: Partial<Theme>;
  };
}

export function ThemeProvider({
  children,
  defaultColorScheme = 'system',
  customTheme,
}: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorSchemeState] =
    useState<ColorScheme>(defaultColorScheme);

  // Determine the effective color scheme
  const effectiveColorScheme =
    colorScheme === 'system' ? systemColorScheme : colorScheme;

  // Get the appropriate theme
  const baseTheme = effectiveColorScheme === 'dark' ? darkTheme : lightTheme;
  const customizations =
    effectiveColorScheme === 'dark' ? customTheme?.dark : customTheme?.light;

  // Merge base theme with customizations
  const theme: Theme = customizations
    ? {
        ...baseTheme,
        colors: { ...baseTheme.colors, ...customizations.colors },
        spacing: { ...baseTheme.spacing, ...customizations.spacing },
        typography: { ...baseTheme.typography, ...customizations.typography },
        shadows: { ...baseTheme.shadows, ...customizations.shadows },
        borderRadius: {
          ...baseTheme.borderRadius,
          ...customizations.borderRadius,
        },
      }
    : baseTheme;

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  const toggleColorScheme = () => {
    if (colorScheme === 'system') {
      setColorScheme(systemColorScheme === 'dark' ? 'light' : 'dark');
    } else {
      setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
    }
  };

  const contextValue: ThemeContextType = {
    theme,
    colorScheme,
    setColorScheme,
    toggleColorScheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
