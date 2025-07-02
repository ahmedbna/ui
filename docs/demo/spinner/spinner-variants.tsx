import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SpinnerVariants() {
  const variants = [
    { variant: 'default' as const, label: 'Default' },
    { variant: 'cirlce' as const, label: 'Circle' },
    { variant: 'dots' as const, label: 'Dots' },
    { variant: 'pulse' as const, label: 'Pulse' },
    { variant: 'bars' as const, label: 'Bars' },
  ];

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
      {variants.map(({ variant, label }) => (
        <View key={variant} style={{ alignItems: 'center', gap: 8 }}>
          <Spinner variant={variant} size='default' />
          <Text variant='caption' style={{ textAlign: 'center' }}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}
