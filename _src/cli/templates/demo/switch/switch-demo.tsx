import { Switch } from '@/components/ui/switch';
import React, { useState } from 'react';

export function SwitchDemo() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Switch
      label='Enable notifications'
      value={isEnabled}
      onValueChange={setIsEnabled}
    />
  );
}
