import { ColorPicker } from '@/components/ui/color-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ColorPickerLabeled() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#333333');
  const [borderColor, setBorderColor] = useState('#e1e5e9');

  return (
    <View style={{ gap: 20 }}>
      {/* Background Color */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <ColorPicker
          value={backgroundColor}
          onColorChange={setBackgroundColor}
          onColorSelect={setBackgroundColor}
          swatchSize={40}
        />
        <View style={{ flex: 1 }}>
          <Text variant='body' style={{ fontWeight: '600' }}>
            Background Color
          </Text>
          <Text variant='caption' style={{ opacity: 0.7 }}>
            {backgroundColor.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Text Color */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <ColorPicker
          value={textColor}
          onColorChange={setTextColor}
          onColorSelect={setTextColor}
          swatchSize={40}
        />
        <View style={{ flex: 1 }}>
          <Text variant='body' style={{ fontWeight: '600' }}>
            Text Color
          </Text>
          <Text variant='caption' style={{ opacity: 0.7 }}>
            {textColor.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Border Color */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <ColorPicker
          value={borderColor}
          onColorChange={setBorderColor}
          onColorSelect={setBorderColor}
          swatchSize={40}
        />
        <View style={{ flex: 1 }}>
          <Text variant='body' style={{ fontWeight: '600' }}>
            Border Color
          </Text>
          <Text variant='caption' style={{ opacity: 0.7 }}>
            {borderColor.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Preview */}
      <View
        style={{
          padding: 16,
          backgroundColor: backgroundColor,
          borderWidth: 2,
          borderColor: borderColor,
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        <Text style={{ color: textColor, textAlign: 'center' }}>
          Preview with selected colors
        </Text>
      </View>
    </View>
  );
}
