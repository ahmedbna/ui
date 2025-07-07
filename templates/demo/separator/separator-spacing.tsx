import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SeparatorSpacing() {
  return (
    <View style={{ padding: 16 }}>
      <Text variant='body'>Tight spacing</Text>
      <Separator style={{ marginVertical: 4 }} />
      <Text variant='body'>Content with minimal spacing</Text>

      <Separator style={{ marginVertical: 12 }} />

      <Text variant='body'>Normal spacing</Text>
      <Separator style={{ marginVertical: 16 }} />
      <Text variant='body'>Standard content spacing</Text>

      <Separator style={{ marginVertical: 12 }} />

      <Text variant='body'>Loose spacing</Text>
      <Separator style={{ marginVertical: 24 }} />
      <Text variant='body'>Generous content spacing</Text>
    </View>
  );
}
