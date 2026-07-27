import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import React from 'react';

export function ButtonSizes() {
  return (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button size='sm' onPress={() => {}}>
        Small
      </Button>
      <Button size='default' onPress={() => {}}>
        Default
      </Button>
      <Button size='lg' onPress={() => {}}>
        Large
      </Button>
    </View>
  );
}
