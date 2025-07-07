import { InputOTP } from '@/components/ui/input-otp';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function InputOTPNoCursor() {
  const [otpWithCursor, setOtpWithCursor] = useState('');
  const [otpWithoutCursor, setOtpWithoutCursor] = useState('');

  return (
    <View style={{ gap: 24 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>
          With Cursor (Default)
        </Text>
        <InputOTP
          length={6}
          value={otpWithCursor}
          onChangeText={setOtpWithCursor}
          showCursor={true}
        />
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '500' }}>Without Cursor</Text>
        <InputOTP
          length={6}
          value={otpWithoutCursor}
          onChangeText={setOtpWithoutCursor}
          showCursor={false}
        />
      </View>

      <Text style={{ fontSize: 12, opacity: 0.7, textAlign: 'center' }}>
        Tap on the inputs above to see the difference in cursor behavior
      </Text>
    </View>
  );
}
