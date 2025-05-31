import { useColorScheme as useRNColorScheme } from 'react-native';
import { ColorScheme } from '../theme/types';

/**
 * Hook to get the current color scheme from React Native
 * Returns 'light' or 'dark' based on system preference
 */
export function useColorScheme(): 'light' | 'dark' {
  const colorScheme = useRNColorScheme();
  return colorScheme === 'dark' ? 'dark' : 'light';
}

/**
 * Hook to determine if the current color scheme is dark
 */
export function useIsDarkMode(): boolean {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark';
}
