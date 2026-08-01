import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { AuthScreen } from '@/components/auth/auth-screen';
import { supabase } from '@/lib/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';

/**
 * The recovery email links here. Supabase appends the PKCE code, the deep-link
 * handler in providers/auth-provider.tsx exchanges it for a session, and the
 * user lands on `/reset-password` already authenticated — which is what lets
 * `updateUser` work without an old password.
 */
const redirectTo = makeRedirectUri({ path: 'reset-password' });

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const send = async () => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });

    setLoading(false);

    if (error) {
      toast.error('Could not send the email', error.message);
      return;
    }

    // Supabase returns success whether or not the address has an account, so
    // that this form cannot be used to enumerate users. Say the same thing back.
    setSent(true);
  };

  if (sent) {
    return (
      <AuthScreen
        title='Check your email'
        subtitle={`If an account exists for ${email.trim()}, a reset link is on its way.`}
      >
        <Text variant='caption'>
          The link opens this app and takes you straight to a new-password
          screen. It expires in an hour.
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
