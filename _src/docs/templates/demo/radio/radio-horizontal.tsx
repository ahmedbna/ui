import { RadioGroup } from '@/components/ui/radio';
import React, { useState } from 'react';

export function RadioHorizontal() {
  const [value, setValue] = useState('small');

  return (
    <RadioGroup
      orientation='horizontal'
      options={[
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
}
