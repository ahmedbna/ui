import { ColorPicker } from '@/components/ui/color-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ColorPickerDisabled() {
  return (
    <View style={{ alignItems: 'center', gap: 12 }}>
      <ColorPicker value='#6c757d' disabled={true} swatchSize={48} />
      <Text variant='caption' style={{ opacity: 0.6 }}>
        Disabled Color Picker
      </Text>
    </View>
  );
}
