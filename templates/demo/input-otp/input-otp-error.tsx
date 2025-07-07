import { Button } from '@/components/ui/button';
import { InputOTP } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function InputOTPError() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const validateOtp = (value: string) => {
    if (value.length === 6) {
      // Simulate validation - reject if all digits are the same
      if (value === '111111' || value === '000000') {
        setError('Invalid verification code. Please try again.');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    validateOtp(value);
  };

  const simulateError = () => {
    setError('Verification code has expired. Please request a new one.');
  };

  const clearError = () => {
    setError('');
    setOtp('');
  };

  return (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          Enter Verification Code
        </Text>
        <Text style={{ fontSize: 12, opacity: 0.7, textAlign: 'center' }}>
          Try entering "111111" or "000000" to see error state
        </Text>
      </View>

      <InputOTP
        length={6}
        value={otp}
        onChangeText={handleOtpChange}
        error={error}
        onComplete={(value) => {
          if (!error) {
            console.log('Valid OTP:', value);
          }
        }}
      />

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button variant='outline' size='sm' onPress={simulateError}>
          Simulate Error
        </Button>
        <Button variant='outline' size='sm' onPress={clearError}>
          Clear
        </Button>
      </View>
    </View>
  );
}
