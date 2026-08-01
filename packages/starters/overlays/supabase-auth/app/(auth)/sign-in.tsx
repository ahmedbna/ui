import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { AuthScreen } from '@/components/auth/auth-screen';
import { OAuthButtons } from '@/components/auth/oauth-buttons';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const signIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      // Supabase returns the same "Invalid login credentials" for a wrong
      // password and an unknown address, on purpose — it stops the form being
      // used to discover who has an account.
      toast.error('Could not sign in', error.message);
      return;
    }

    // No navigation call: the session lands, `onAuthStateChange` fires, and the
    // guards in app/_layout.tsx swap `(auth)` out for `(tabs)`.
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

      <Button
        variant='secondary'
        disabled={loading}
        onPress={() => router.push('/magic-link')}
      >
        Email me a link instead
      </Button>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Separator />
        </View>
        <Text variant='caption'>or</Text>
        <View style={{ flex: 1 }}>
          <Separator />
        </View>
      </View>

      <OAuthButtons disabled={loading} />
    </AuthScreen>
  );
}
