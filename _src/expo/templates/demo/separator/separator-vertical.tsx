import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SeparatorVertical() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        height: 60,
      }}
    >
      <Text variant='body'>Left content</Text>
      <Separator orientation='vertical' style={{ marginHorizontal: 16 }} />
      <Text variant='body'>Right content</Text>
    </View>
  );
}
