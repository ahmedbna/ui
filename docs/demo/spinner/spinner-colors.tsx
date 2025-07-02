import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SpinnerColors() {
  const colors = [
    { color: '#3b82f6', label: 'Blue', variant: 'default' as const },
    { color: '#10b981', label: 'Green', variant: 'dots' as const },
    { color: '#f59e0b', label: 'Orange', variant: 'pulse' as const },
    { color: '#ef4444', label: 'Red', variant: 'bars' as const },
    { color: '#8b5cf6', label: 'Purple', variant: 'cirlce' as const },
  ];

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
      {colors.map(({ color, label, variant }) => (
        <View key={color} style={{ alignItems: 'center', gap: 8 }}>
          <Spinner variant={variant} size='default' color={color} />
          <Text variant='caption' style={{ textAlign: 'center' }}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}
