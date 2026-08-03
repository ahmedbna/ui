import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { useModeContext } from '@/providers/mode-provider';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web.
 *
 * Mirrors the native variant: a mounted `ModeProvider` wins, falling back to the
 * OS scheme. The provider is what makes the toggle work here at all —
 * react-native-web's `Appearance` is read-only, exposing `getColorScheme` and
 * `addChangeListener` but no setter, so nothing can push an override into the
 * value `useRNColorScheme()` reports.
 *
 * React Native 0.86's `ColorSchemeName` includes `'unspecified'`, which the
 * binary theme has no slot for, so it collapses here.
 */
export function useColorScheme(): 'light' | 'dark' {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const system = useRNColorScheme() === 'dark' ? 'dark' : 'light';
  const scheme = useModeContext()?.scheme ?? system;

  if (hasHydrated) {
    return scheme;
  }

  return 'light';
}
