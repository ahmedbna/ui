import { Toggle } from '@/components/ui/toggle';
import { View } from '@/components/ui/view';
import { Bold, Italic } from 'lucide-react-native';
import React from 'react';

export function ToggleDisabled() {
  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Toggle pressed={false} disabled>
        <Bold size={16} />
      </Toggle>
      <Toggle pressed={true} disabled>
        <Italic size={16} />
      </Toggle>
      <Toggle pressed={false} disabled variant='outline'>
        <Bold size={16} />
      </Toggle>
      <Toggle pressed={true} disabled variant='outline'>
        <Italic size={16} />
      </Toggle>
    </View>
  );
}
