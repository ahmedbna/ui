import { ColorSwatch } from '@/components/ui/color-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ColorSwatchDemo() {
  const [selectedColor, setSelectedColor] = useState('#e74c3c');

  const colors = [
    '#e74c3c',
    '#3498db',
    '#2ecc71',
    '#f39c12',
    '#9b59b6',
    '#1abc9c',
    '#e67e22',
    '#34495e',
  ];

  return (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'center',
        }}
      >
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            size={36}
            onPress={() => setSelectedColor(color)}
            style={{
              borderWidth: selectedColor === color ? 3 : 2,
              borderColor: selectedColor === color ? '#000' : 'transparent',
            }}
          />
        ))}
      </View>
      <Text variant='body'>Selected: {selectedColor.toUpperCase()}</Text>
    </View>
  );
}
