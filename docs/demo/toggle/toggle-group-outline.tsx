import { ToggleGroupSingle } from '@/components/ui/toggle';
import { Bold, Italic, Underline } from 'lucide-react-native';
import React, { useState } from 'react';

export function ToggleGroupOutline() {
  const [value, setValue] = useState('bold');

  const items = [
    { value: 'bold', label: 'Bold', icon: Bold },
    { value: 'italic', label: 'Italic', icon: Italic },
    { value: 'underline', label: 'Underline', icon: Underline },
  ];

  return (
    <ToggleGroupSingle
      value={value}
      onValueChange={setValue}
      items={items}
      variant='outline'
      size='default'
    />
  );
}
