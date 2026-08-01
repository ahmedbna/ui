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

const redirectTo = makeRedirectUri();

/**
 * Passwordless sign-in.
 *
 * One `signInWithOtp` call sends both a clickable link and a six-digit code —
 * which one the user gets depends on your email template. The link comes back
 * through the deep-link handler in providers/auth-provider.tsx; the code is
 * entered on `/verify-otp`. Offering both is what makes this work when the mail
 * app opens the link in a browser that cannot reach the app.
 */
export default function MagicLinkScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const send = async () => {
    const address = email.trim();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: address,
      options: {
        emailRedirectTo: redirectTo,
        // Off, so this screen cannot be used to create accounts by accident.
        // Turn it on if you want magic links to double as sign-up.
        shouldCreateUser: false,
      },
    });

    setLoading(false);

    if (error) {
      toast.error('Could not send the link', error.message);
      return;
    }

    router.push({ pathname: '/verify-otp', params: { email: address } });
  };

  return (
    <AuthScreen
      title='Sign in with email'
      subtitle='We will send you a link and a code. Either one works.'
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
        Send me a link
      </Button>

      <Text variant='caption'>
        Only works for an address that already has an account. Sign up first if
        you do not.
      </Text>
    </AuthScreen>
  );
}
