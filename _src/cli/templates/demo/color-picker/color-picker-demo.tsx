import { ColorPicker } from '@/components/ui/color-picker';
import React, { useState } from 'react';

export function ColorPickerDemo() {
  const [color, setColor] = useState('#ff0000');

  return (
    <ColorPicker
      value={color}
      onColorChange={setColor}
      onColorSelect={(selectedColor) => {
        console.log('Color selected:', selectedColor);
        setColor(selectedColor);
      }}
    />
  );
}
