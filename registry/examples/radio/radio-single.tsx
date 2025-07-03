import { RadioButton } from '@/components/ui/radio';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function RadioSingle() {
  const [selectedValue, setSelectedValue] = useState('option2');

  const options = [
    { label: 'First Option', value: 'option1' },
    { label: 'Second Option', value: 'option2' },
    { label: 'Third Option', value: 'option3' },
    { label: 'Disabled Option', value: 'option4', disabled: true },
  ];

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: '500', fontSize: 16 }}>
        Individual Radio Buttons
      </Text>

      <View style={{ gap: 8 }}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            option={option}
            selected={selectedValue === option.value}
            onPress={() => setSelectedValue(option.value)}
          />
        ))}
      </View>

      <Text variant='caption'>Selected: {selectedValue}</Text>
    </View>
  );
}
