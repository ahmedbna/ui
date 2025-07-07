import { ColorPicker } from '@/components/ui/color-picker';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ColorPickerSizes() {
  const [smallColor, setSmallColor] = useState('#ff6b6b');
  const [mediumColor, setMediumColor] = useState('#4ecdc4');
  const [largeColor, setLargeColor] = useState('#45b7d1');
  const [xlColor, setXlColor] = useState('#f9ca24');

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <ColorPicker
        value={smallColor}
        onColorChange={setSmallColor}
        onColorSelect={setSmallColor}
        swatchSize={24}
      />
      <ColorPicker
        value={mediumColor}
        onColorChange={setMediumColor}
        onColorSelect={setMediumColor}
        swatchSize={32}
      />
      <ColorPicker
        value={largeColor}
        onColorChange={setLargeColor}
        onColorSelect={setLargeColor}
        swatchSize={48}
      />
      <ColorPicker
        value={xlColor}
        onColorChange={setXlColor}
        onColorSelect={setXlColor}
        swatchSize={64}
      />
    </View>
  );
}
