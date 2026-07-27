import { Picker } from '@/components/ui/picker';
import React, { useState } from 'react';

export function PickerMultiple() {
  const [values, setValues] = useState<string[]>([]);

  const options = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'Rust', value: 'rust' },
  ];

  return (
    <Picker
      options={options}
      values={values}
      onValuesChange={setValues}
      placeholder='Select languages...'
      multiple
      modalTitle='Programming Languages'
    />
  );
}
