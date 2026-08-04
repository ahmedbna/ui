import { AuthScreen } from '@/components/auth/auth-screen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { messageFor } from '@/lib/errors';
import { auth } from '@/lib/firebase';
import { PENDING_EMAIL_KEY } from '@/providers/auth-provider';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';

/**
 * Passwordless sign-in by emailed link.
 *
 * Firebase calls this "email link sign-in"; "magic link" is Supabase's word for
 * the same idea. It is reached only when EXPO_PUBLIC_FIREBASE_LINK_URL is set —
 * `sign-in.tsx` hides the entry point otherwise — because unlike every other
 * flow here it cannot work without setup:
 *
 * Firebase Dynamic Links shut down on 25 August 2025. The replacement is that
 * Firebase mints the link on your project's Firebase Hosting domain (or a
 * custom one passed as `linkDomain`), and your app claims that domain through
 * Universal Links on iOS and App Links on Android. Both are native
 * entitlements, so this needs a development or EAS build — it cannot work in
 * Expo Go, and without the domain claim the link opens a web page that has no
 * way back into the app.
 *
 * `url` must be **https** and its domain must be listed under Authentication →
 * Settings → Authorized domains. A custom scheme is rejected outright.
 */
const linkUrl = process.env.EXPO_PUBLIC_FIREBASE_LINK_URL;

export default function EmailLinkScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const send = async () => {
    if (!linkUrl) return;

    setLoading(true);
    const address = email.trim();

    try {
      await sendSignInLinkToEmail(auth, address, {
        url: linkUrl,
        // Without this Firebase sends a link that completes in the browser
        // rather than handing the app an oobCode to spend.
        handleCodeInApp: true,
      });

      // `signInWithEmailLink` needs the address back, and the link may be
      // opened from a mail app rather than this one — so it has to be persisted
      // rather than held in state. The provider reads this key.
      //
      // It is deliberately not re-prompted for on the other side: asking "which
      // address was this?" when a link is opened is a phishing pattern, so a
      // link opened on a different device is a dead end by design.
      await SecureStore.setItemAsync(PENDING_EMAIL_KEY, address);

      setSent(true);
    } catch (caught) {
      toast.error('Could not send the link', messageFor(caught));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthScreen
        title='Check your email'
        subtitle={`We sent a sign-in link to ${email.trim()}.`}
      >
        <Text variant='caption'>
          Open it on this device — the link has to come back to the app that
          requested it.
        </Text>

        <Button variant='ghost' onPress={() => router.replace('/sign-in')}>
          Back to sign in
        </Button>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen
      title='Sign in without a password'
      subtitle='We will email you a link that signs you straight in.'
      footer={
        <Button variant='ghost' onPress={() => router.back()}>
          Use a password instead
        </Button>
      }
    >
      <Input
        label='Email'
        icon={Mail}
        placeholder='you@example.com'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        autoComplete='email'
        keyboardType='email-address'
        textContentType='emailAddress'
        onSubmitEditing={() => email.trim() && send()}
      />

      <Button
        disabled={!email.trim() || loading}
        loading={loading}
        onPress={send}
      >
        Email me a link
      </Button>
    </AuthScreen>
  );
}
