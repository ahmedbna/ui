import { InputOTP } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function InputOTPMasked() {
  const [normalOtp, setNormalOtp] = useState('');
  const [maskedOtp, setMaskedOtp] = useState('');

  return (
    <View style={{ gap: 24 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          Normal (Visible Digits)
        </Text>
        <InputOTP length={6} value={normalOtp} onChangeText={setNormalOtp} />
        {normalOtp && (
          <Text style={{ fontSize: 12, opacity: 0.7 }}>
            Current value: {normalOtp}
          </Text>
        )}
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          Masked (Hidden Digits)
        </Text>
        <InputOTP
          length={6}
          value={maskedOtp}
          onChangeText={setMaskedOtp}
          masked={true}
        />
        {maskedOtp && (
          <Text style={{ fontSize: 12, opacity: 0.7 }}>
            Current value: {maskedOtp}
          </Text>
        )}
      </View>
    </View>
  );
}
