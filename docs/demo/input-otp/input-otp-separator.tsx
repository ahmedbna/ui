import { InputOTP, InputOTPWithSeparator } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';

export function InputOTPSeparator() {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');

  const muted = useThemeColor({}, 'textMuted');

  return (
    <View style={{ gap: 24 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          With Dash Separator
        </Text>
        <InputOTPWithSeparator length={6} value={otp1} onChangeText={setOtp1} />
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          With Dot Separator
        </Text>
        <InputOTP
          length={6}
          value={otp2}
          onChangeText={setOtp2}
          separator={
            <Text style={{ fontSize: 16, color: muted, fontWeight: 'bold' }}>
              •
            </Text>
          }
        />
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          With Custom Separator
        </Text>
        <InputOTP
          length={4}
          value={otp3}
          onChangeText={setOtp3}
          separator={
            <View
              style={{
                width: 8,
                height: 2,
                backgroundColor: muted,
                marginHorizontal: 4,
              }}
            />
          }
        />
      </View>
    </View>
  );
}
