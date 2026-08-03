import { useColorScheme as useRNColorScheme } from 'react-native';

import { useModeContext } from '@/providers/mode-provider';

/**
 * The one place the app's colour scheme is decided.
 *
 * A mounted `ModeProvider` wins, so an in-app light/dark toggle works on every
 * platform — including web, where react-native-web has no
 * `Appearance.setColorScheme` for the toggle to write through. With no provider
 * this is just the OS scheme, so installing `useColor` alone still behaves as
 * it always has.
 *
 * React Native 0.86 widened `ColorSchemeName` to `'light' | 'dark' |
 * 'unspecified'`. The theme is binary — `Colors` only has `light` and `dark`
 * keys — so collapse the third value here, once, and let every consumer keep
 * indexing with a two-value union.
 */
export function useColorScheme(): 'light' | 'dark' {
  const system = useRNColorScheme() === 'dark' ? 'dark' : 'light';
  return useModeContext()?.scheme ?? system;
}
