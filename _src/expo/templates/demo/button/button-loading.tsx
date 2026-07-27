import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import { Save } from 'lucide-react-native';
import React from 'react';

export function ButtonLoading() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button loading onPress={() => {}}>
        Loading...
      </Button>
      <Button loading variant='outline' onPress={() => {}}>
        Please wait
      </Button>
      <Button loading variant='destructive' onPress={() => {}}>
        Deleting...
      </Button>
      <Button loading size='icon' onPress={() => {}}>
        <Save size={20} color='white' />
      </Button>
    </View>
  );
}
