import { Switch } from '@/components/ui/switch';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function SwitchError() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={{ gap: 46 }}>
      <Switch
        label='Terms and conditions'
        value={isEnabled}
        onValueChange={setIsEnabled}
      />

      <Switch
        label='Privacy policy'
        value={false}
        onValueChange={() => {}}
        error='You must accept the privacy policy'
      />
    </View>
  );
}
