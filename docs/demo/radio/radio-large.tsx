import { RadioGroup } from '@/components/ui/radio';
import React, { useState } from 'react';

export function RadioLarge() {
  const [value, setValue] = useState('option1');

  return (
    <RadioGroup
      options={[
        { label: 'Large Option One', value: 'option1' },
        { label: 'Large Option Two', value: 'option2' },
        { label: 'Large Option Three', value: 'option3' },
      ]}
      value={value}
      onValueChange={setValue}
      style={{ gap: 12 }}
      optionStyle={{
        paddingVertical: 12,
      }}
      labelStyle={{
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 28,
      }}
    />
  );
}
