// Example usage of InputOTP component
import {
  InputOTP,
  InputOTPRef,
  InputOTPWithSeparator,
} from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useRef, useState } from 'react';
import { Alert, Pressable } from 'react-native';

export function InputOTPExamples() {
  const [otp, setOtp] = useState('');
  const [maskedOtp, setMaskedOtp] = useState('');
  const [separatorOtp, setSeparatorOtp] = useState('');
  const [errorOtp, setErrorOtp] = useState('');
  const [error, setError] = useState('');

  const otpRef = useRef<InputOTPRef>(null);

  const handleOTPComplete = (value: string) => {
    Alert.alert('OTP Complete', `Entered OTP: ${value}`);
  };

  const handleErrorOTPChange = (value: string) => {
    setErrorOtp(value);
    // Simulate validation
    if (value.length === 6 && value !== '123456') {
      setError('Invalid OTP. Please try again.');
    } else {
      setError('');
    }
  };

  const clearOTP = () => {
    otpRef.current?.clear();
  };

  const focusOTP = () => {
    otpRef.current?.focus();
  };

  return (
    <View style={{ padding: 20, gap: 32 }}>
      <Text variant='heading'>InputOTP demo</Text>

      {/* Basic OTP */}
      <View style={{ gap: 8 }}>
        <Text variant='title'>Basic OTP (6 digits)</Text>
        <InputOTP
          ref={otpRef}
          value={otp}
          onChangeText={setOtp}
          onComplete={handleOTPComplete}
          placeholder='Enter OTP'
        />
        <Text variant='caption'>Current value: {otp}</Text>
      </View>

      {/* Masked OTP */}
      <View style={{ gap: 8 }}>
        <Text variant='title'>Masked OTP</Text>
        <InputOTP
          value={maskedOtp}
          onChangeText={setMaskedOtp}
          masked={true}
          placeholder='Enter PIN'
        />
        <Text variant='caption'>Current value: {maskedOtp}</Text>
      </View>

      {/* OTP with Separator */}
      <View style={{ gap: 8 }}>
        <Text variant='title'>OTP with Separator</Text>
        <InputOTPWithSeparator
          value={separatorOtp}
          onChangeText={setSeparatorOtp}
          length={4}
        />
        <Text variant='caption'>Current value: {separatorOtp}</Text>
      </View>

      {/* OTP with Error */}
      <View style={{ gap: 8 }}>
        <Text variant='title'>OTP with Validation</Text>
        <InputOTP
          value={errorOtp}
          onChangeText={handleErrorOTPChange}
          error={error}
          placeholder='Enter 123456'
        />
        <Text variant='caption'>
          Try entering anything other than &quot;123456&quot;
        </Text>
      </View>

      {/* Custom Length OTP */}
      <View style={{ gap: 8 }}>
        <Text variant='title'>Custom Length (4 digits)</Text>
        <InputOTP
          length={4}
          value={otp.slice(0, 4)}
          onChangeText={(value) => setOtp(value)}
        />
      </View>

      {/* Disabled OTP */}
      <View style={{ gap: 8 }}>
        <Text variant='title'>Disabled State</Text>
        <InputOTP value='1234' disabled={true} />
      </View>

      {/* Custom Separator */}
      <View style={{ gap: 8 }}>
        <Text variant='title'>Custom Separator</Text>
        <InputOTP
          length={4}
          value={separatorOtp}
          onChangeText={setSeparatorOtp}
          separator={
            <View
              style={{
                width: 8,
                height: 2,
                backgroundColor: '#666',
                marginHorizontal: 4,
              }}
            />
          }
        />
      </View>
    </View>
  );
}

// Usage in a form with validation
export function OTPFormExample() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (otp === '123456') {
        Alert.alert('Success', 'OTP verified successfully!');
        setOtp('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    Alert.alert('OTP Sent', 'A new OTP has been sent to your phone.');
    setOtp('');
    setError('');
  };

  return (
    <View style={{ padding: 20, gap: 24 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text variant='title'>Verify Your Phone</Text>
        <Text variant='caption' style={{ textAlign: 'center' }}>
          Enter the 6-digit code sent to your phone number
        </Text>
      </View>

      <InputOTP
        value={otp}
        onChangeText={setOtp}
        error={error}
        disabled={isLoading}
        onComplete={handleSubmit}
      />

      <View style={{ gap: 12 }}>
        <Pressable
          onPress={handleSubmit}
          disabled={otp.length !== 6 || isLoading}
          style={{
            padding: 16,
            backgroundColor:
              otp.length === 6 && !isLoading ? '#007AFF' : '#ccc',
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </Pressable>

        <Pressable
          onPress={handleResend}
          disabled={isLoading}
          style={{
            padding: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#007AFF' }}>Resend OTP</Text>
        </Pressable>
      </View>
    </View>
  );
}
