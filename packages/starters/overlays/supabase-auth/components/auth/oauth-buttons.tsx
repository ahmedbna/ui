import { Ionicons } from '@expo/vector-icons';
import type { Provider } from '@supabase/supabase-js';
import { makeRedirectUri } from 'expo-auth-session';
import { openAuthSessionAsync } from 'expo-web-browser';
import { useState } from 'react';
import { Platform } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { supabase } from '@/lib/supabase';

/**
 * Where the provider sends the browser once the user approves.
 *
 * `makeRedirectUri()` resolves to `exp://…` under Expo Go and `<scheme>://`
 * in a build, reading `scheme` from app.json. Both spellings have to be listed
 * as redirect URLs in your Supabase project, or the callback is rejected —
 * that is the single most common OAuth failure here.
 */
const redirectTo = makeRedirectUri();

const PROVIDERS: {
  provider: Provider;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { provider: 'google', label: 'Continue with Google', icon: 'logo-google' },
  { provider: 'apple', label: 'Continue with Apple', icon: 'logo-apple' },
  { provider: 'github', label: 'Continue with GitHub', icon: 'logo-github' },
];

/**
 * Browser-based OAuth, one code path for every provider.
 *
 * The alternative — native sign-in SDKs feeding `signInWithIdToken` — gives a
 * nicer sheet on iOS but needs a development build, per-platform client IDs and
 * a config plugin each. This works in Expo Go and on web, which is the right
 * trade for a starter. The docs cover swapping to native.
 *
 * `skipBrowserRedirect` keeps supabase-js from navigating the page itself; we
 * want the URL so it can be opened in an auth session that returns control to
 * the app.
 */
export function OAuthButtons({ disabled }: { disabled?: boolean }) {
  const [pending, setPending] = useState<Provider | null>(null);
  const toast = useToast();
  // `variant='outline'` renders its label in `primary`; match the icon to it.
  const primary = useColor('primary');

  const signInWith = async (provider: Provider) => {
    setPending(provider);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo, skipBrowserRedirect: true },
      });

      if (error) throw error;
      if (!data.url) throw new Error('No authorization URL returned');

      if (Platform.OS === 'web') {
        // On web the browser navigates and `detectSessionInUrl` finishes the
        // job on the way back. `assign` rather than setting `location.href`:
        // the React Compiler treats the assignment as mutating a value it does
        // not own.
        globalThis.location.assign(data.url);
        return;
      }

      const result = await openAuthSessionAsync(data.url, redirectTo);

      if (result.type !== 'success') {
        // Dismissed or cancelled — not an error worth a toast.
        return;
      }

      const code = new URL(result.url).searchParams.get('code');
      if (!code) throw new Error('No authorization code in the callback URL');

      // Trades the code for a session using the PKCE verifier this device
      // generated. `onAuthStateChange` in the provider picks it up from here.
      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) throw exchangeError;
    } catch (caught) {
      toast.error('Sign-in failed', (caught as Error).message);
    } finally {
      setPending(null);
    }
  };

  return (
    <View style={{ gap: 8 }}>
      {PROVIDERS.map(({ provider, label, icon }) => (
        <Button
          key={provider}
          variant='outline'
          disabled={disabled || pending !== null}
          loading={pending === provider}
          onPress={() => signInWith(provider)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <Ionicons name={icon} size={18} color={primary} />
            <Text style={{ fontWeight: '500', color: primary }}>{label}</Text>
          </View>
        </Button>
      ))}
    </View>
  );
}
