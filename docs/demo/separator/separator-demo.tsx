import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SeparatorDemo() {
  return (
    <View style={{ padding: 16 }}>
      <Text variant='body'>Above separator</Text>
      <Separator style={{ marginVertical: 16 }} />
      <Text variant='body'>Below separator</Text>
    </View>
  );
}
