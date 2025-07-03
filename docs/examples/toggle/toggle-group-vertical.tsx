import { ToggleGroupSingle } from '@/components/ui/toggle';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react-native';
import React, { useState } from 'react';

export function ToggleGroupVertical() {
  const [value, setValue] = useState('left');

  const items = [
    { value: 'left', label: 'Left Align', icon: AlignLeft },
    { value: 'center', label: 'Center Align', icon: AlignCenter },
    { value: 'right', label: 'Right Align', icon: AlignRight },
  ];

  return (
    <ToggleGroupSingle
      value={value}
      onValueChange={setValue}
      items={items}
      orientation='vertical'
      size='default'
    />
  );
}
