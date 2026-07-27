import { Picker } from '@/components/ui/picker';
import React, { useState } from 'react';

export function PickerSearchable() {
  const [value, setValue] = useState<string>('');

  const options = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Australia', value: 'au' },
    { label: 'Brazil', value: 'br' },
    { label: 'India', value: 'in' },
    { label: 'China', value: 'cn' },
  ];

  return (
    <Picker
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder='Select a country...'
      searchable
      searchPlaceholder='Search countries...'
      modalTitle='Countries'
    />
  );
}
