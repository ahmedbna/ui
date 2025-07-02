import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import React, { useState } from 'react';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

export function ComboboxDisabled() {
  const [value, setValue] = useState('react');

  return (
    <Combobox value={value} onValueChange={setValue} disabled>
      <ComboboxTrigger>
        <ComboboxValue placeholder='Select framework...' />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder='Search frameworks...' />
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          {frameworks.map((framework) => (
            <ComboboxItem key={framework.value} value={framework.value}>
              {framework.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
