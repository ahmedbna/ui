import { Button } from '@/components/ui/button';
import { InputOTP } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function InputOTPDisabled() {
  const [otp, setOtp] = useState('123');
  const [disabled, setDisabled] = useState(true);

  return (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Disabled State</Text>
        <Text style={{ fontSize: 12, opacity: 0.7, textAlign: 'center' }}>
          Toggle the button below to enable/disable the input
        </Text>
      </View>

      <InputOTP
        length={6}
        value={otp}
        onChangeText={setOtp}
        disabled={disabled}
      />

      <Button
        variant={disabled ? 'default' : 'outline'}
        size='sm'
        onPress={() => setDisabled(!disabled)}
      >
        {disabled ? 'Enable Input' : 'Disable Input'}
      </Button>

      {!disabled && (
        <Text style={{ fontSize: 12, opacity: 0.7 }}>Current value: {otp}</Text>
      )}
    </View>
  );
}
