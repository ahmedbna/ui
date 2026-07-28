import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * React Native 0.86 widened `ColorSchemeName` to `'light' | 'dark' |
 * 'unspecified'`. The theme is binary — `Colors` only has `light` and `dark`
 * keys — so collapse the third value here, once, and let every consumer keep
 * indexing with a two-value union.
 */
export function useColorScheme(): 'light' | 'dark' {
  return useRNColorScheme() === 'dark' ? 'dark' : 'light';
}
