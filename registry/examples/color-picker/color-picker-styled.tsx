import { ColorPicker } from '@/components/ui/color-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ColorPickerStyled() {
  const [primaryColor, setPrimaryColor] = useState('#007AFF');
  const [accentColor, setAccentColor] = useState('#FF3B30');

  return (
    <View style={{ gap: 20 }}>
      {/* Rounded Square Style */}
      <View style={{ alignItems: 'center', gap: 8 }}>
        <ColorPicker
          value={primaryColor}
          onColorChange={setPrimaryColor}
          onColorSelect={setPrimaryColor}
          swatchSize={50}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        />
        <Text variant='caption'>Primary Color</Text>
      </View>

      {/* With Custom Border */}
      <View style={{ alignItems: 'center', gap: 8 }}>
        <View
          style={{
            padding: 4,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: '#ddd',
            backgroundColor: '#fff',
          }}
        >
          <ColorPicker
            value={accentColor}
            onColorChange={setAccentColor}
            onColorSelect={setAccentColor}
            swatchSize={40}
          />
        </View>
        <Text variant='caption'>Accent Color</Text>
      </View>
    </View>
  );
}
