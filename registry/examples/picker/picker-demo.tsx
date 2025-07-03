import { Picker } from '@/components/ui/picker';
import React, { useState } from 'react';

export function PickerDemo() {
  const [value, setValue] = useState<string>('');

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grape', value: 'grape' },
  ];

  return (
    <Picker
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder='Select a fruit...'
    />
  );
}
