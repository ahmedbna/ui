import { Checkbox } from '@/components/ui/checkbox';
import React, { useState } from 'react';

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      label='Accept terms and conditions'
    />
  );
}
