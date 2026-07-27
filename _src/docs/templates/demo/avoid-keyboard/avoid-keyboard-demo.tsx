import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';
import React from 'react';

export function AvoidKeyboardDemo() {
  const { keyboardHeight, isKeyboardVisible, keyboardAnimationDuration } =
    useKeyboardHeight();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant='title' style={{ marginBottom: 20 }}>
        Basic Keyboard Avoidance
      </Text>

      <Text variant='body' style={{ marginBottom: 30, opacity: 0.7 }}>
        Tap the input below to see the keyboard avoidance in action. The content
        will smoothly move up to keep the input visible.
      </Text>

      {/* Spacer to push input toward bottom */}

      <View style={{ flex: 1 }}>
        <Text>Keyboard Height: {keyboardHeight}</Text>
        <Text>Keyboard Visible: {isKeyboardVisible ? 'Yes' : 'No'}</Text>
        <Text>Animation Duration: {keyboardAnimationDuration}ms</Text>
      </View>

      <Input placeholder='Type your message here...' label='Message' />

      {/* This will create space to avoid the keyboard */}
      <AvoidKeyboard />
    </View>
  );
}
