import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { AuthScreen } from '@/components/auth/auth-screen';
import { supabase } from '@/lib/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import { router } from 'expo-router';
import { Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';

/** Where the confirmation email sends the user back to. */
const redirectTo = makeRedirectUri();

/**
 * Mirrors the rule Supabase enforces server-side, so the user is told before
 * the round trip rather than after it. Change both together: the project's
 * password policy lives in Authentication → Providers → Email.
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

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: redirectTo,
        // Read by the handle_new_user trigger in 0001_profiles.sql, so the
        // profile row has a name from the moment it exists.
        data: { display_name: displayName.trim() || null },
      },
    });

    setLoading(false);

    if (error) {
      toast.error('Could not sign up', error.message);
      return;
    }

    // With email confirmation on, `session` is null and nothing changes until
    // the user opens the link — so say so, rather than leaving them on a form
    // that looks like it failed. With it off, the session arrives here and the
    // route guards take over.
    if (!data.session) {
      toast.success(
        'Check your email',
        `We sent a confirmation link to ${email.trim()}.`
      );
      router.replace('/sign-in');
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
