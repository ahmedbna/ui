import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';
import { Theme } from '../theme/types';

/**
 * Hook to access the current theme from ThemeProvider
 */
export function useTheme(): Theme {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context.theme;
}

/**
 * Hook to access theme context including setters
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}
