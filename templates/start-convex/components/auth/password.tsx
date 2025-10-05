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

type AuthStep =
  | 'signIn'
  | 'signUp'
  | 'verifyEmail' // For new user email verification
  | 'forgotPassword' // Screen to enter email for password reset
  | 'resetPassword'; // Screen to enter reset code and new password

export const Password = () => {
  const { signIn } = useAuthActions();
  const green = useColor('green');

  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState<AuthStep>('signIn');

  // Form inputs
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetFormState = () => {
    setEmail('');
    setPassword('');
    setCode('');
    setNewPassword('');
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

  const handleSignInUpSubmit = async () => {
    if (!validateEmail(email) || !validatePassword(password)) return;

    setLoading(true);
    setError('');

    try {
      await signIn('password', { name, gender, email, password, flow: step });

      if (step === 'signUp') {
        setStep('verifyEmail');
        setPassword('');
      }
    } catch (err: any) {
      console.error(`${step} error:`, err);
      setError('Authentication failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailSubmit = async () => {
    if (code.length < 6) {
      setError('Please enter the 6-digit code.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await signIn('password', {
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

  const handleSendResetCode = async () => {
    if (!validateEmail(email)) return;

    setLoading(true);
    setError('');

    try {
      await signIn('password', { email, flow: 'reset' });
      setStep('resetPassword');
    } catch (err: any) {
      console.error('Send reset code error:', err);
      setError(
        'Failed to send reset code. Please check the email and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validatePassword(newPassword)) return;
    if (code.length < 6) {
      setError('Please enter the 6-digit reset code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn('password', {
        email,
        code,
        newPassword,
        flow: 'reset-verification',
      });

      changeStep('signIn');
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError('Failed to reset password. The code may be invalid or expired.');
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
              onComplete={handleVerifyEmailSubmit}
              // error={error}
            />
            <Button
              onPress={handleVerifyEmailSubmit}
              disabled={loading || code.length < 6}
              loading={loading}
            >
              Verify
            </Button>
            <Button
              variant='link'
              onPress={() => changeStep('signUp')}
              disabled={loading}
            >
              Use a different email
            </Button>
          </View>
        </CardContent>
      </Card>
    );
  }

  if (step === 'forgotPassword') {
    return (
      <Card>
        <CardHeader>
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <KeyRound color={green} size={40} />
          </View>
          <Text variant='title' style={{ textAlign: 'center' }}>
            Reset your password
          </Text>
          <CardDescription style={{ textAlign: 'center' }}>
            Enter your email to receive a password reset code.
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
          <Button
            onPress={handleSendResetCode}
            disabled={loading}
            loading={loading}
          >
            Send Reset Code
          </Button>
          <Button
            variant='link'
            onPress={() => changeStep('signIn')}
            disabled={loading}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'resetPassword') {
    return (
      <Card>
        <CardHeader>
          <Text variant='title' style={{ textAlign: 'center' }}>
            Create a new password
          </Text>
          <CardDescription style={{ textAlign: 'center' }}>
            A reset code was sent to {email}.
          </CardDescription>
        </CardHeader>
        <CardContent style={{ gap: 16 }}>
          <Input
            value={code}
            variant='outline'
            placeholder='6-digit reset code'
            onChangeText={setCode}
            keyboardType='number-pad'
            maxLength={6}
            error={error.includes('code') ? error : undefined}
            editable={!loading}
          />
          <Input
            value={newPassword}
            variant='outline'
            placeholder='New password'
            onChangeText={setNewPassword}
            secureTextEntry
            autoComplete='new-password'
            error={error.includes('password') ? error : undefined}
            editable={!loading}
          />
          <Button
            onPress={handleResetPassword}
            disabled={loading}
            loading={loading}
          >
            Reset Password
          </Button>
          <Button
            variant='link'
            onPress={() => changeStep('forgotPassword')}
            disabled={loading}
          >
            Use a different email
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Default view for 'signIn' and 'signUp'
  const isSigningIn = step === 'signIn';

  return (
    <Card>
      <CardHeader>
        <CardDescription style={{ textAlign: 'center' }}>
          {isSigningIn
            ? 'Welcome back! Login to continue.'
            : 'Create an account to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent style={{ gap: 16 }}>
        {step === 'signUp' ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Input
              value={name}
              variant='outline'
              placeholder='Name'
              onChangeText={setName}
              autoCapitalize='words'
              autoCorrect={false}
              editable={!loading}
              containerStyle={{ width: '49%' }}
            />
            <Input
              value={gender}
              variant='outline'
              placeholder='Gender'
              onChangeText={setGender}
              autoCapitalize='words'
              autoCorrect={false}
              editable={!loading}
              containerStyle={{ width: '49%' }}
            />
          </View>
        ) : null}

        <Input
          value={email}
          variant='outline'
          placeholder='me@example.com'
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          autoComplete='email'
          editable={!loading}
        />
        <Input
          value={password}
          variant='outline'
          placeholder='Password'
          onChangeText={setPassword}
          secureTextEntry
          autoComplete={isSigningIn ? 'current-password' : 'new-password'}
          editable={!loading}
        />
        {!!error && (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        )}
        <Button
          onPress={handleSignInUpSubmit}
          disabled={loading}
          loading={loading}
        >
          {isSigningIn ? 'Login' : 'Create new account'}
        </Button>
        <Button
          variant='link'
          onPress={() => changeStep(isSigningIn ? 'signUp' : 'signIn')}
          disabled={loading}
        >
          {isSigningIn
            ? 'Create new account'
            : 'Already have an account, Login'}
        </Button>
        {isSigningIn && (
          <Button
            variant='link'
            disabled={loading}
            onPress={() => changeStep('forgotPassword')}
          >
            Forgot password
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
