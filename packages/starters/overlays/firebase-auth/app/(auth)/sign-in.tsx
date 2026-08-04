import { AuthScreen } from '@/components/auth/auth-screen';
import { OAuthButtons } from '@/components/auth/oauth-buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { messageFor } from '@/lib/errors';
import { auth } from '@/lib/firebase';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';

/** Email link sign-in only works once a link domain is configured. */
const emailLinkEnabled = Boolean(process.env.EXPO_PUBLIC_FIREBASE_LINK_URL);

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const signIn = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // No navigation call: the user lands, `onAuthStateChanged` fires, and the
      // guards in app/_layout.tsx swap `(auth)` out for `(tabs)`.
    } catch (caught) {
      // Firebase returns `auth/invalid-credential` for both a wrong password
      // and an unknown address when email enumeration protection is on — the
      // default for projects created since September 2023. That is deliberate:
      // it stops this form being used to discover who has an account. If you
      // see distinct errors instead, the setting is off in Authentication →
      // Settings → User actions.
      toast.error('Could not sign in', messageFor(caught));
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.trim().length > 0 && password.length > 0;

  return (
    <AuthScreen
      title='Welcome back'
      subtitle='Sign in to continue.'
      footer={
        <>
          <Button
            variant='ghost'
            onPress={() => router.push('/forgot-password')}
          >
            Forgot your password?
          </Button>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Text variant='caption'>New here?</Text>
            <Button
              variant='link'
              size='sm'
              onPress={() => router.push('/sign-up')}
            >
              Create an account
            </Button>
          </View>
        </>
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
      />

      <Input
        label='Password'
        icon={Lock}
        placeholder='Your password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize='none'
        autoComplete='current-password'
        textContentType='password'
        onSubmitEditing={() => canSubmit && signIn()}
      />

      <Button
        disabled={!canSubmit || loading}
        loading={loading}
        onPress={signIn}
      >
        Sign in
      </Button>

      {/* Hidden until EXPO_PUBLIC_FIREBASE_LINK_URL is set. Firebase Dynamic
          Links shut down in August 2025, so an email link now needs a Hosting
          domain the app claims through Universal Links / App Links — offering
          the button before that is set up would send users a link that opens a
          web page and never comes back. See the README. */}
      {emailLinkEnabled && (
        <Button
          variant='secondary'
          disabled={loading}
          onPress={() => router.push('/email-link')}
        >
          Email me a link instead
        </Button>
      )}

      {/* Renders nothing — separator included — when no provider is
          configured. */}
      <OAuthButtons disabled={loading} />
    </AuthScreen>
  );
}
