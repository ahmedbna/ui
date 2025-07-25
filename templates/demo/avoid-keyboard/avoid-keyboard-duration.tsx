import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function AvoidKeyboardDuration() {
  const [duration, setDuration] = useState(0);

  const durations = [
    { label: 'Default', value: 0 },
    { label: 'Fast (100ms)', value: 100 },
    { label: 'Slow (500ms)', value: 500 },
    { label: 'Very Slow (1000ms)', value: 1000 },
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant='title' style={{ marginBottom: 20 }}>
        Custom Animation Duration
      </Text>

      <Text variant='body' style={{ marginBottom: 20, opacity: 0.7 }}>
        Choose different animation speeds to see how it affects the keyboard
        avoidance:
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 20,
        }}
      >
        {durations.map((item) => (
          <Button
            key={item.value}
            variant={duration === item.value ? 'default' : 'secondary'}
            size='sm'
            onPress={() => setDuration(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </View>

      <Text variant='caption' style={{ marginBottom: 30, opacity: 0.6 }}>
        Current duration: {duration}ms extra
      </Text>

      {/* Spacer to push input toward bottom */}
      <View style={{ flex: 1 }} />

      <Input placeholder='Tap to test animation speed...' label='Test Input' />

      {/* Use custom duration */}
      <AvoidKeyboard duration={duration} />
    </View>
  );
}
