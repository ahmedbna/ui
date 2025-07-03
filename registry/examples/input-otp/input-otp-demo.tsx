import { InputOTP } from '@/components/ui/input-otp';
import React, { useState } from 'react';

export function InputOTPDemo() {
  const [otp, setOtp] = useState('');

  return (
    <InputOTP
      length={6}
      value={otp}
      onChangeText={setOtp}
      onComplete={(value) => {
        console.log('OTP Complete:', value);
      }}
    />
  );
}
