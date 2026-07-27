import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import { Lock } from 'lucide-react-native';
import React from 'react';

export function ButtonDisabled() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button disabled onPress={() => {}}>
        Disabled
      </Button>
      <Button disabled variant='outline' onPress={() => {}}>
        Disabled Outline
      </Button>
      <Button disabled variant='destructive' onPress={() => {}}>
        Disabled Destructive
      </Button>
      <Button disabled size='icon' onPress={() => {}} icon={Lock} />
    </View>
  );
}
