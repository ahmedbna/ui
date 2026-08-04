import { AuthScreen } from '@/components/auth/auth-screen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { messageFor } from '@/lib/errors';
import { auth } from '@/lib/firebase';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';

/**
 * Where the reset link sends the user.
 *
 * Unset by default, and that is the shipped behaviour: without it Firebase uses
 * its own hosted reset page, which works perfectly well — the user changes
 * their password in the browser and comes back to the app to sign in. Set
 * EXPO_PUBLIC_FIREBASE_LINK_URL to a Hosting URL your app claims through
 * Universal Links / App Links and the link opens `/reset-password` in the app
 * instead. See the README.
 *
 * Note this must be an **https** URL on a domain listed under Authentication →
 * Settings → Authorized domains. A custom scheme (`myapp://`) is rejected.
 */
const linkUrl = process.env.EXPO_PUBLIC_FIREBASE_LINK_URL;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const send = async () => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(
        auth,
        email.trim(),
        linkUrl ? { url: linkUrl, handleCodeInApp: true } : undefined
      );
      setSent(true);
    } catch (caught) {
      // With email enumeration protection on — the default since September
      // 2023 — Firebase resolves successfully for an unknown address too, so
      // this branch is a genuine failure (a malformed address, a rate limit),
      // not "no such user".
      toast.error('Could not send the email', messageFor(caught));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthScreen
        title='Check your email'
        subtitle={`If an account exists for ${email.trim()}, a reset link is on its way.`}
      >
        <Text variant='caption'>
          {linkUrl
            ? 'The link opens this app and takes you straight to a new-password screen. It expires in an hour.'
            : 'The link opens a page where you can set a new password, then come back here to sign in. It expires in an hour.'}
        </Text>

        <Button onPress={() => router.replace('/sign-in')}>
          Back to sign in
        </Button>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen
      title='Reset your password'
      subtitle='We will email you a link.'
      footer={
        <Button variant='ghost' onPress={() => router.back()}>
          Back to sign in
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
        Send reset link
      </Button>
    </AuthScreen>
  );
}
