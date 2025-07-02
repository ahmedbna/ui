import { Switch } from '@/components/ui/switch';
import React, { useState } from 'react';

export function SwitchSimple() {
  const [isEnabled, setIsEnabled] = useState(false);

  return <Switch value={isEnabled} onValueChange={setIsEnabled} />;
}
