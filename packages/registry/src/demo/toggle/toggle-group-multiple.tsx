import { ToggleGroupMultiple } from '@/components/ui/toggle';
import { Bold, Italic, Underline } from 'lucide-react-native';
import React, { useState } from 'react';

export function ToggleGroupMultipleDemo() {
  const [value, setValue] = useState(['bold']);

  const items = [
    { value: 'bold', label: 'Bold', icon: Bold },
    { value: 'italic', label: 'Italic', icon: Italic },
    { value: 'underline', label: 'Underline', icon: Underline },
  ];

  return (
    <ToggleGroupMultiple
      value={value}
      onValueChange={setValue}
      items={items}
      size='icon'
    />
  );
}
