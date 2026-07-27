import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import React from 'react';

export function ButtonVariants() {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Button variant='default' onPress={() => {}} style={{ flex: 1 }}>
          Default
        </Button>
        <Button variant='destructive' onPress={() => {}} style={{ flex: 2 }}>
          Destructive
        </Button>
      </View>
      <Button variant='success' onPress={() => {}}>
        Success
      </Button>
      <Button variant='outline' onPress={() => {}}>
        Outline
      </Button>
      <Button variant='secondary' onPress={() => {}}>
        Secondary
      </Button>
      <Button variant='ghost' onPress={() => {}}>
        Ghost
      </Button>
      <Button variant='link' onPress={() => {}}>
        Link
      </Button>
    </View>
  );
}
