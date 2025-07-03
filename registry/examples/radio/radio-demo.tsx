import { RadioGroup } from '@/components/ui/radio';
import React, { useState } from 'react';

export function RadioDemo() {
  const [value, setValue] = useState('option1');

  return (
    <RadioGroup
      options={[
        { label: 'Default', value: 'option1' },
        { label: 'Comfortable', value: 'option2' },
        { label: 'Compact', value: 'option3' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
}
