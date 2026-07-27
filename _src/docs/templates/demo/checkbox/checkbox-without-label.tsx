import { Checkbox } from '@/components/ui/checkbox';
import React, { useState } from 'react';

export function CheckboxWithoutLabel() {
  const [checked, setChecked] = useState(false);

  return <Checkbox checked={checked} onCheckedChange={setChecked} />;
}
