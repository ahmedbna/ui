import { InlineLoader } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function SpinnerInline() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text>Loading data</Text>
        <InlineLoader size='sm' variant='default' />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text>Processing</Text>
        <InlineLoader size='sm' variant='dots' />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <InlineLoader size='sm' variant='pulse' color='#10b981' />
        <Text>Syncing...</Text>
      </View>
    </View>
  );
}
