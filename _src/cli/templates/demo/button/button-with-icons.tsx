import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import { Download, Mail, Plus, Search } from 'lucide-react-native';
import React from 'react';

export function ButtonWithIcons() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button icon={Download} onPress={() => {}}>
        Download
      </Button>
      <Button icon={Mail} variant='outline' onPress={() => {}}>
        Email
      </Button>
      <Button icon={Plus} variant='success' onPress={() => {}}>
        Add Item
      </Button>
      <Button icon={Search} variant='secondary' onPress={() => {}}>
        Search
      </Button>
    </View>
  );
}
