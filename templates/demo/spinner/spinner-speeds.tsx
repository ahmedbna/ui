import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SpinnerSpeeds() {
  const speeds = [
    { speed: 'slow' as const, label: 'Slow' },
    { speed: 'normal' as const, label: 'Normal' },
    { speed: 'fast' as const, label: 'Fast' },
  ];

  return (
    <View style={{ flexDirection: 'row', gap: 32 }}>
      {speeds.map(({ speed, label }) => (
        <View key={speed} style={{ alignItems: 'center', gap: 8 }}>
          <Spinner variant='cirlce' size='default' speed={speed} />
          <Text variant='caption' style={{ textAlign: 'center' }}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}
