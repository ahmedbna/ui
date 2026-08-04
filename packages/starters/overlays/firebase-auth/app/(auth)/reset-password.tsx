import { AuthScreen } from '@/components/auth/auth-screen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { messageFor } from '@/lib/errors';
import { auth } from '@/lib/firebase';
import { router, useLocalSearchParams } from 'expo-router';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { Lock } from 'lucide-react-native';
import { useEffect, useState } from 'react';

function describePasswordProblem(password: string): string | undefined {
  if (password.length < 8) return 'At least 8 characters.';
  if (!/[a-z]/.test(password)) return 'Include a lowercase letter.';
  if (!/[A-Z]/.test(password)) return 'Include an uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Include a digit.';
  return undefined;
}

/**
 * Reached by opening a password-reset link, not by navigation.
 *
 * **The user is not signed in here, at any point.** This is the biggest
 * difference from the equivalent Supabase screen, where the recovery link is
 * exchanged for a session first and `updateUser({ password })` then works
 * without an old password. Firebase instead hands the app a one-time `oobCode`:
 * `verifyPasswordResetCode` says which address it belongs to,
 * `confirmPasswordReset` spends it, and the user then signs in normally.
 *
 * It is only reachable at all once EXPO_PUBLIC_FIREBASE_LINK_URL points at a
 * Hosting domain this app claims through Universal Links / App Links. Without
 * that, the reset link opens Firebase's hosted page in a browser instead —
 * which works fine, and is the default. See the README.
 */
export default function ResetPasswordScreen() {
  const { oobCode } = useLocalSearchParams<{ oobCode?: string }>();
  const [email, setEmail] = useState<string | null>(null);
  const [rejected, setRejected] = useState(false);
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const problem = describePasswordProblem(password);
  // Derived rather than set in an effect: a missing code is knowable at render
  // time, and setting state for it would just cause a second render.
  const invalid = rejected || !oobCode;

  useEffect(() => {
    if (!oobCode) return;

    let active = true;

    // Checks the code is real and unexpired *before* showing a form, and tells
    // us whose account it is — worth showing, so a user who has two addresses
    // knows which one they are changing.
    verifyPasswordResetCode(auth, oobCode)
      .then((address) => {
        if (active) setEmail(address);
      })
      .catch(() => {
        if (active) setRejected(true);
      });

    return () => {
      active = false;
    };
  }, [oobCode]);

  const submit = async () => {
    setTouched(true);
    if (problem || !oobCode) return;

    setLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success('Password updated', 'Sign in with your new password.');
      // The code is spent and there is no session, so sign-in is the only way
      // forward. `replace` so Back cannot return to a dead form.
      router.replace('/sign-in');
    } catch (caught) {
      toast.error('Could not update your password', messageFor(caught));
    } finally {
      setLoading(false);
    }
  };

  if (invalid) {
    return (
      <AuthScreen
        title='That link has expired'
        subtitle='Reset links can only be used once, and they last an hour.'
      >
        <Button onPress={() => router.replace('/forgot-password')}>
          Send a new link
        </Button>
      </AuthScreen>
    );
  }

  if (!email) {
    return (
      <AuthScreen title='Opening your link' subtitle='One moment.'>
        <View style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Spinner size='lg' variant='circle' />
        </View>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen title='Choose a new password' subtitle={`For ${email}.`}>
      <Input
        label='New password'
        icon={Lock}
        placeholder='At least 8 characters'
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouched(true)}
        error={touched ? problem : undefined}
        secureTextEntry
        autoCapitalize='none'
        autoComplete='new-password'
        textContentType='newPassword'
        autoFocus
      />

      <Button
        disabled={!password || loading}
        loading={loading}
        onPress={submit}
      >
        Update password
      </Button>

      <Text variant='caption'>
        You will sign in with the new password on the next screen.
      </Text>
    </AuthScreen>
  );
}
