import { InputOTP } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function InputOTPLengths() {
  const [otp4, setOtp4] = useState('');
  const [otp6, setOtp6] = useState('');

  return (
    <View style={{ gap: 20 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>4 Digits</Text>
        <InputOTP length={4} value={otp4} onChangeText={setOtp4} />
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          6 Digits (Default)
        </Text>
        <InputOTP length={6} value={otp6} onChangeText={setOtp6} />
      </View>
    </View>
  );
}
