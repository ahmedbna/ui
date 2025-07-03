import { RadioGroup } from '@/components/ui/radio';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function RadioDisabled() {
  const [value1, setValue1] = useState('option1');
  const [value2, setValue2] = useState('option2');

  return (
    <View style={{ gap: 24 }}>
      {/* Some disabled options */}
      <View>
        <Text style={{ marginBottom: 12, fontWeight: '500' }}>
          With disabled options
        </Text>
        <RadioGroup
          options={[
            { label: 'Available', value: 'option1' },
            { label: 'Disabled', value: 'option2', disabled: true },
            { label: 'Available', value: 'option3' },
            { label: 'Disabled', value: 'option4', disabled: true },
          ]}
          value={value1}
          onValueChange={setValue1}
        />
      </View>

      {/* Entire group disabled */}
      <View>
        <Text style={{ marginBottom: 12, fontWeight: '500' }}>
          Entire group disabled
        </Text>
        <RadioGroup
          disabled
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
          value={value2}
          onValueChange={setValue2}
        />
      </View>
    </View>
  );
}
