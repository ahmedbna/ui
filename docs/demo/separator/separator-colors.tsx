import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SeparatorColors() {
  return (
    <View style={{ padding: 16 }}>
      <Text variant='caption' style={{ marginBottom: 8 }}>
        Default
      </Text>
      <Separator style={{ marginBottom: 16 }} />

      <Text variant='caption' style={{ marginBottom: 8 }}>
        Red
      </Text>
      <Separator style={{ backgroundColor: '#ef4444', marginBottom: 16 }} />

      <Text variant='caption' style={{ marginBottom: 8 }}>
        Blue
      </Text>
      <Separator style={{ backgroundColor: '#3b82f6', marginBottom: 16 }} />

      <Text variant='caption' style={{ marginBottom: 8 }}>
        Green
      </Text>
      <Separator style={{ backgroundColor: '#10b981', marginBottom: 16 }} />

      <Text variant='caption' style={{ marginBottom: 8 }}>
        Semi-transparent
      </Text>
      <Separator style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
    </View>
  );
}
