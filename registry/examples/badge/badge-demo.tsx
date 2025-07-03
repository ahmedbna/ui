import { Badge } from '@/components/ui/badge';
import { View } from '@/components/ui/view';
import React from 'react';

export function BadgeDemo() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Badge>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='destructive'>Destructive</Badge>
      <Badge variant='outline'>Outline</Badge>
      <Badge variant='success'>Success</Badge>
    </View>
  );
}
