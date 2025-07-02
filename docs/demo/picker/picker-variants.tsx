import { Picker } from '@/components/ui/picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function PickerVariants() {
  const [outlineValue, setOutlineValue] = useState<string>('');
  const [filledValue, setFilledValue] = useState<string>('');
  const [groupValue, setGroupValue] = useState<string>('');

  const options = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
  ];

  return (
    <View style={{ gap: 20 }}>
      <View>
        <Text variant='caption' style={{ marginBottom: 8 }}>
          Outline Variant
        </Text>
        <Picker
          options={options}
          value={outlineValue}
          onValueChange={setOutlineValue}
          placeholder='Select size...'
          variant='outline'
        />
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 8 }}>
          Filled Variant
        </Text>
        <Picker
          options={options}
          value={filledValue}
          onValueChange={setFilledValue}
          placeholder='Select size...'
          variant='filled'
        />
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 8 }}>
          Group Variant
        </Text>
        <Picker
          options={options}
          value={groupValue}
          onValueChange={setGroupValue}
          placeholder='Select size...'
          variant='group'
        />
      </View>
    </View>
  );
}
