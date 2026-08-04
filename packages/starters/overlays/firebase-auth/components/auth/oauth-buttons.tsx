import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as Crypto from 'expo-crypto';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { messageFor } from '@/lib/errors';
import { auth } from '@/lib/firebase';

/**
 * Google and Apple sign-in.
 *
 * Both follow the same shape: get an ID token from the platform, wrap it in a
 * Firebase credential, hand it to `signInWithCredential`. Firebase's browser
 * flows — `signInWithPopup` and `signInWithRedirect` — throw
 * `auth/operation-not-supported-in-this-environment` on React Native, so this
 * is the only route, not a stylistic choice.
 *
 * ## This needs a development build
 *
 * Not Expo Go. `expo-auth-session`'s hosted proxy (`auth.expo.io`) was removed
 * in SDK 48, so under Expo Go the redirect is `exp://…`, which no Google OAuth
 * client type accepts. `expo-apple-authentication` does run in Expo Go, but the
 * token is issued to Expo Go's bundle identifier, which your Firebase Apple
 * provider does not trust.
 *
 * Email and password sign-in, Firestore and Storage all work fine in Expo Go —
 * only these buttons need `npx expo run:ios` or an EAS development build.
 *
 * ## Nothing is configured?
 *
 * Then nothing renders — including the "or" separator, which lives inside this
 * component so `sign-in.tsx` does not have to know. A missing client ID is
 * never a runtime error and never a button that fails when pressed.
 */
export function OAuthButtons({ disabled }: { disabled?: boolean }) {
  const [pending, setPending] = useState<'google' | 'apple' | null>(null);
  const [appleAvailable, setAppleAvailable] = useState(false);
  const toast = useToast();
  // `variant='outline'` renders its label in `primary`; match the icon to it.
  const primary = useColor('primary');

  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

  /**
   * `useIdTokenAuthRequest`, not `useAuthRequest`: Firebase wants an ID token,
   * and asking Google for an access token instead is the most common reason
   * `signInWithCredential` rejects a Google credential.
   *
   * The `response` slot is deliberately unused — `promptAsync()` resolves with
   * the same result, so the whole flow fits in the press handler below rather
   * than being split across an effect that watches it.
   */
  const [request, , promptAsync] = Google.useIdTokenAuthRequest({
    // Load-bearing on native too, not just web: Firebase lists this one under
    // the Google provider's "Web SDK configuration", and the ID token's `aud`
    // claim must match it or the credential is refused.
    webClientId,
    iosClientId,
    androidClientId,
  });

  // Google is offered only when the web client ID and the one for this
  // platform are both present — either alone produces a token Firebase rejects.
  const platformClientId =
    Platform.OS === 'ios'
      ? iosClientId
      : Platform.OS === 'android'
        ? androidClientId
        : webClientId;
  const googleConfigured = Boolean(webClientId && platformClientId);

  useEffect(() => {
    // False on Android, on web, and on iOS below 13.
    AppleAuthentication.isAvailableAsync()
      .then(setAppleAvailable)
      .catch(() => {
        setAppleAvailable(false);
      });
  }, []);

  const signInWithGoogle = async () => {
    setPending('google');

    try {
      // Resolves once the browser closes, with the same object the hook's
      // `response` slot would receive.
      const result = await promptAsync();

      // Dismissed or cancelled — not an error worth a toast.
      if (result?.type !== 'success') return;

      const idToken = result.params?.id_token;
      if (!idToken) throw new Error('Google returned no ID token.');

      await signInWithCredential(auth, GoogleAuthProvider.credential(idToken));
      // No navigation: `onAuthStateChanged` fires and the guards take over.
    } catch (caught) {
      toast.error('Sign-in failed', messageFor(caught));
    } finally {
      setPending(null);
    }
  };

  const signInWithApple = async () => {
    setPending('apple');

    try {
      // Apple hashes the nonce it embeds in the ID token; Firebase compares
      // that hash against the raw value handed to it here. Send the SHA-256 to
      // Apple and keep the plaintext for Firebase — swap them and you get
      // auth/invalid-credential with nothing to say why.
      const rawNonce = Crypto.randomUUID();
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        rawNonce
      );

      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (!appleCredential.identityToken) {
        throw new Error('Apple returned no identity token.');
      }

      const credential = new OAuthProvider('apple.com').credential({
        idToken: appleCredential.identityToken,
        rawNonce,
      });

      const result = await signInWithCredential(auth, credential);

      // Apple sends `fullName` and `email` on the very first authorization for
      // a given Apple ID and never again — revoke the app under Settings →
      // Apple ID → Sign in with Apple to see them a second time. So the name
      // has to be captured here or it is gone. The profile document is created
      // by the provider's snapshot listener; onboarding fills in the rest.
      const given = appleCredential.fullName?.givenName;
      const family = appleCredential.fullName?.familyName;
      if ((given || family) && !result.user.displayName) {
        await updateProfile(result.user, {
          displayName: [given, family].filter(Boolean).join(' '),
        }).catch(() => {});
      }
    } catch (caught) {
      // The user tapping Cancel arrives here as ERR_REQUEST_CANCELED.
      if ((caught as { code?: string })?.code !== 'ERR_REQUEST_CANCELED') {
        toast.error('Sign-in failed', messageFor(caught));
      }
    } finally {
      setPending(null);
    }
  };

  const showGoogle = googleConfigured;
  const showApple = appleAvailable;

  // Nothing configured, nothing to show — including the separator.
  if (!showGoogle && !showApple) return null;

  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Separator />
        </View>
        <Text variant='caption'>or</Text>
        <View style={{ flex: 1 }}>
          <Separator />
        </View>
      </View>

      {showGoogle && (
        <Button
          variant='outline'
          disabled={disabled || !request || pending !== null}
          loading={pending === 'google'}
          onPress={signInWithGoogle}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <Ionicons name='logo-google' size={18} color={primary} />
            <Text style={{ fontWeight: '500', color: primary }}>
              Continue with Google
            </Text>
          </View>
        </Button>
      )}

      {showApple && (
        <Button
          variant='outline'
          disabled={disabled || pending !== null}
          loading={pending === 'apple'}
          onPress={signInWithApple}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <Ionicons name='logo-apple' size={18} color={primary} />
            <Text style={{ fontWeight: '500', color: primary }}>
              Continue with Apple
            </Text>
          </View>
        </Button>
      )}
    </View>
  );
}
