import { Picker } from '@/components/ui/picker';
import React, { useState } from 'react';

export function PickerSections() {
  const [value, setValue] = useState<string>('');

  const sections = [
    {
      title: 'Fruits',
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ],
    },
    {
      title: 'Vegetables',
      options: [
        { label: 'Carrot', value: 'carrot' },
        { label: 'Broccoli', value: 'broccoli' },
        { label: 'Spinach', value: 'spinach' },
      ],
    },
  ];

  return (
    <Picker
      sections={sections}
      value={value}
      onValueChange={setValue}
      placeholder='Select an item...'
      modalTitle='Choose Food'
    />
  );
}
