import { Button } from '@/components/ui/button';
import { InputOTP } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { AuthScreen } from '@/components/auth/auth-screen';
import { supabase } from '@/lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const CODE_LENGTH = 6;

export default function VerifyOtpScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [resending, setResending] = useState(false);
  const toast = useToast();

  const verify = async (value: string) => {
    if (!email) return;

    setLoading(true);
    setError(undefined);

    // `type: 'email'` covers both magic-link and OTP sign-in. Use
    // `'recovery'` for password reset and `'signup'` for confirmation codes —
    // passing the wrong type is rejected even when the digits are right.
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: value,
      type: 'email',
    });

    setLoading(false);

    if (verifyError) {
      setError(verifyError.message);
      setCode('');
      return;
    }

    // Session established; the guards in app/_layout.tsx take it from here.
  };

  const resend = async () => {
    if (!email) return;

    setResending(true);
    const { error: resendError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    setResending(false);

    if (resendError) toast.error('Could not resend', resendError.message);
    else toast.success('Sent', `A new code is on its way to ${email}.`);
  };

  if (!email) {
    return (
      <AuthScreen
        title='Something went missing'
        subtitle='We do not know which address to verify.'
      >
        <Button onPress={() => router.replace('/magic-link')}>
          Start over
        </Button>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen
      title='Enter your code'
      subtitle={`We sent a ${CODE_LENGTH}-digit code to ${email}.`}
      footer={
        <>
          <Button variant='ghost' loading={resending} onPress={resend}>
            Send it again
          </Button>
          <Button variant='link' size='sm' onPress={() => router.back()}>
            Use a different address
          </Button>
        </>
      }
    >
      <View style={{ alignItems: 'center', gap: 16 }}>
        <InputOTP
          length={CODE_LENGTH}
          value={code}
          onChangeText={setCode}
          // Submits on the last digit, so there is nothing else to press.
          onComplete={verify}
          error={error}
          disabled={loading}
          autoFocus
        />

        {loading && <Text variant='caption'>Verifying…</Text>}
      </View>
    </AuthScreen>
  );
}
