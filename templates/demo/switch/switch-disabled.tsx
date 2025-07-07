import { Switch } from '@/components/ui/switch';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function SwitchDisabled() {
  const [value, setValue] = useState(false);

  return (
    <View style={{ gap: 12 }}>
      <Switch value={value} label='Disabled (Off)' onValueChange={setValue} />

      <Switch
        label='Disabled (On)'
        value={true}
        onValueChange={() => {}}
        disabled={true}
      />
    </View>
  );
}
