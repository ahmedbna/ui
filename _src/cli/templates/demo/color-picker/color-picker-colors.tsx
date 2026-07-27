import { ColorPicker } from '@/components/ui/color-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ColorPickerColors() {
  const [redColor, setRedColor] = useState('#e74c3c');
  const [greenColor, setGreenColor] = useState('#2ecc71');
  const [blueColor, setBlueColor] = useState('#3498db');
  const [purpleColor, setPurpleColor] = useState('#9b59b6');
  const [orangeColor, setOrangeColor] = useState('#f39c12');

  const colorData = [
    { name: 'Red', color: redColor, setter: setRedColor },
    { name: 'Green', color: greenColor, setter: setGreenColor },
    { name: 'Blue', color: blueColor, setter: setBlueColor },
    { name: 'Purple', color: purpleColor, setter: setPurpleColor },
    { name: 'Orange', color: orangeColor, setter: setOrangeColor },
  ];

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {colorData.map(({ name, color, setter }) => (
        <View key={name} style={{ alignItems: 'center', gap: 8 }}>
          <ColorPicker
            value={color}
            onColorChange={setter}
            onColorSelect={setter}
            swatchSize={40}
          />
          <Text variant='caption'>{name}</Text>
        </View>
      ))}
    </View>
  );
}
