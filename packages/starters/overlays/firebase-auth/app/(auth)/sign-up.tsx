import { AuthScreen } from '@/components/auth/auth-screen';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { messageFor } from '@/lib/errors';
import { auth } from '@/lib/firebase';
import { router } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';

/**
 * Mirrors what Firebase enforces server-side, so the user is told before the
 * round trip rather than after it.
 *
 * Firebase's own floor is six characters and nothing else. Everything past that
 * is this app's opinion — a reasonable one, but if you want it enforced rather
 * than suggested, configure a password policy under Authentication → Settings →
 * Password policy (Identity Platform) and keep the two in step. Until you do,
 * a determined client can bypass this by calling the SDK directly.
 */
function describePasswordProblem(password: string): string | undefined {
  if (password.length < 8) return 'At least 8 characters.';
  if (!/[a-z]/.test(password)) return 'Include a lowercase letter.';
  if (!/[A-Z]/.test(password)) return 'Include an uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Include a digit.';
  return undefined;
}

export default function SignUpScreen() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const passwordProblem = describePasswordProblem(password);

  const signUp = async () => {
    setTouched(true);
    if (passwordProblem) return;

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const name = displayName.trim();
      if (name) {
        // Written to the Auth record, which the provider then copies into
        // users/{uid} when it creates the profile document.
        await updateProfile(user, { displayName: name });
      }

      await sendEmailVerification(user).catch(() => {
        // Rate limited, most likely. Settings offers a resend button, so this
        // is not worth failing the sign-up over.
      });

      // Firebase signs the user in immediately, verified or not — there is no
      // "check your email before you can continue" state the way there is with
      // Supabase's email confirmation. So the route guards take over from here
      // and an unverified-email card in Settings does the nagging.
      //
      // If you want verification to be mandatory, gate the `(tabs)` guard in
      // app/_layout.tsx on `user.emailVerified` as well as on `user`.
      toast.success(
        'Welcome',
        `We sent a verification link to ${email.trim()}.`
      );
    } catch (caught) {
      toast.error('Could not sign up', messageFor(caught));
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.trim().length > 0 && password.length > 0 && accepted;

  return (
    <AuthScreen
      title='Create an account'
      subtitle='It takes about ten seconds.'
      footer={
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text variant='caption'>Already have one?</Text>
          <Button variant='link' size='sm' onPress={() => router.back()}>
            Sign in
          </Button>
        </View>
      }
    >
      <Input
        label='Name'
        icon={User}
        placeholder='Ada Lovelace'
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize='words'
        autoComplete='name'
        textContentType='name'
      />

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
        placeholder='At least 8 characters'
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouched(true)}
        error={touched ? passwordProblem : undefined}
        secureTextEntry
        autoCapitalize='none'
        autoComplete='new-password'
        textContentType='newPassword'
      />

      <Checkbox
        checked={accepted}
        onCheckedChange={setAccepted}
        label='I agree to the terms and privacy policy'
      />

      <Button
        disabled={!canSubmit || loading}
        loading={loading}
        onPress={signUp}
      >
        Create account
      </Button>
    </AuthScreen>
  );
}
