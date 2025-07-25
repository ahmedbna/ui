import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function AvoidKeyboardOffset() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant='title' style={{ marginBottom: 20 }}>
        With Extra Offset
      </Text>

      <Text variant='body' style={{ marginBottom: 30, opacity: 0.7 }}>
        This example adds 40px of extra spacing above the keyboard for better
        visual separation.
      </Text>

      {/* Spacer to push input toward bottom */}
      <View style={{ flex: 1 }} />

      <Input
        placeholder='Notice the extra space above keyboard...'
        label='Message'
      />

      {/* Add 40px extra spacing above keyboard */}
      <AvoidKeyboard offset={40} />
    </View>
  );
}
