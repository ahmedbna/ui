import { InputOTP } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';

export function InputOTPStyled() {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');

  const primary = useThemeColor({}, 'primary');
  const success = '#10B981';
  const purple = '#8B5CF6';

  return (
    <View style={{ gap: 24 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Rounded Style</Text>
        <InputOTP
          length={6}
          value={otp1}
          onChangeText={setOtp1}
          slotStyle={{
            borderRadius: 25,
            borderWidth: 2,
            borderColor: primary,
          }}
        />
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Success Theme</Text>
        <InputOTP
          length={4}
          value={otp2}
          onChangeText={setOtp2}
          slotStyle={{
            borderColor: success,
            backgroundColor: success + '10',
            borderRadius: 8,
          }}
        />
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Large & Purple</Text>
        <InputOTP
          length={4}
          value={otp3}
          onChangeText={setOtp3}
          slotStyle={{
            width: 70,
            height: 70,
            borderColor: purple,
            borderWidth: 2,
            borderRadius: 12,
            backgroundColor: purple + '05',
          }}
          containerStyle={{
            gap: 12,
          }}
        />
      </View>
    </View>
  );
}
