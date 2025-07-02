import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SpinnerSizes() {
  const sizes = [
    { size: 'sm' as const, label: 'Small' },
    { size: 'default' as const, label: 'Default' },
    { size: 'lg' as const, label: 'Large' },
    { size: 'icon' as const, label: 'Icon' },
  ];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
      {sizes.map(({ size, label }) => (
        <View key={size} style={{ alignItems: 'center', gap: 8 }}>
          <Spinner size={size} variant='cirlce' />
          <Text variant='caption' style={{ textAlign: 'center' }}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}
