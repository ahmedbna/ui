import { Chip } from '@/components/ui/chip';
import { View } from '@/components/ui/view';
import React from 'react';

export function ChipDemo() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Chip label="Default Chip" />
      <Chip label="Outline Chip" variant="outline" />
      <Chip label="Selected Chip" selected={true} />
      <Chip label="Closable Chip" onClose={() => console.log('Closed')} />
    </View>
  );
}
