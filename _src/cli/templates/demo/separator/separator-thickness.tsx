import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SeparatorThickness() {
  return (
    <View style={{ padding: 16 }}>
      <Text variant='caption' style={{ marginBottom: 8 }}>
        Thin (1px)
      </Text>
      <Separator style={{ height: 1, marginBottom: 16 }} />

      <Text variant='caption' style={{ marginBottom: 8 }}>
        Medium (2px)
      </Text>
      <Separator style={{ height: 2, marginBottom: 16 }} />

      <Text variant='caption' style={{ marginBottom: 8 }}>
        Thick (4px)
      </Text>
      <Separator style={{ height: 4, marginBottom: 16 }} />

      <Text variant='caption' style={{ marginBottom: 8 }}>
        Extra thick (8px)
      </Text>
      <Separator style={{ height: 8 }} />
    </View>
  );
}
