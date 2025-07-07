import { ToggleGroupSingle } from '@/components/ui/toggle';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react-native';
import React, { useState } from 'react';

export function ToggleGroupSingleDemo() {
  const [value, setValue] = useState('left');

  const items = [
    { value: 'left', label: 'Left', icon: AlignLeft },
    { value: 'center', label: 'Center', icon: AlignCenter },
    { value: 'right', label: 'Right', icon: AlignRight },
  ];

  return (
    <ToggleGroupSingle
      value={value}
      onValueChange={setValue}
      items={items}
      size='icon'
    />
  );
}
