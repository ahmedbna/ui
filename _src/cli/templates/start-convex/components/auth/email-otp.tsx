import React, { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { KeyRound, MailCheck } from 'lucide-react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { InputOTP } from '@/components/ui/input-otp';
import { useColor } from '@/hooks/useColor';

type AuthStep = 'signIn' | 'verifyEmail';

export const EmailOTP = () => {
  const { signIn } = useAuthActions();
  const green = useColor('green');

  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState<AuthStep>('signIn');

  // Form inputs
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetFormState = () => {
    setEmail('');
    setCode('');
    setError('');
    setLoading(false);
  };

  const changeStep = (newStep: AuthStep) => {
    resetFormState();
    setStep(newStep);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (
      value.length < 8 ||
      !/\d/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[A-Z]/.test(value)
    ) {
      setError(
        'Password must be 8+ characters with uppercase, lowercase, and numbers.'
      );
      return false;
    }
    setError('');
    return true;
  };

  const handleSendCode = async () => {
    if (!validateEmail(email)) return;

    setLoading(true);
    setError('');

    try {
      await signIn('resend-otp', { email, flow: step });

      setStep('verifyEmail');
    } catch (err: any) {
      console.error(`${step} error:`, err);
      setError('Authentication failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (code.length < 6) {
      setError('Please enter the 6-digit code.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await signIn('resend-otp', {
        email,
        code,
        flow: 'email-verification',
      });
    } catch (err: any) {
      console.error('Email verification error:', err);
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verifyEmail') {
    return (
      <Card>
        <CardContent>
          <View style={{ gap: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <MailCheck color={green} size={40} />
            </View>
            <View style={{ gap: 8 }}>
              <Text variant='title' style={{ textAlign: 'center' }}>
                Check your email
              </Text>
              <Text variant='subtitle' style={{ textAlign: 'center' }}>
                {`We've sent a 6-digit code to ${email}`}
              </Text>
            </View>
            <InputOTP
              length={6}
              value={code}
              onChangeText={setCode}
              onComplete={handleVerifyEmail}
              // error={error}
            />
            <Button
              onPress={handleVerifyEmail}
              disabled={loading || code.length < 6}
              loading={loading}
            >
              Verify Code
            </Button>
            <Button
              variant='link'
              onPress={() => changeStep('signIn')}
              disabled={loading}
            >
              Use a different email
            </Button>
          </View>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <KeyRound color={green} size={40} />
        </View>
        <Text variant='title' style={{ textAlign: 'center' }}>
          OTP Email Login
        </Text>
        <CardDescription style={{ textAlign: 'center' }}>
          Enter your email to receive OTP code.
        </CardDescription>
      </CardHeader>
      <CardContent style={{ gap: 16 }}>
        <Input
          value={email}
          variant='outline'
          placeholder='me@example.com'
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          autoComplete='email'
          error={error}
          editable={!loading}
        />
        <Button onPress={handleSendCode} disabled={loading} loading={loading}>
          Send Code
        </Button>
      </CardContent>
    </Card>
  );
};
