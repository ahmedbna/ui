import { Toggle } from '@/components/ui/toggle';
import { Bold } from 'lucide-react-native';
import React, { useState } from 'react';

export function ToggleDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed}>
      <Bold size={16} />
    </Toggle>
  );
}
