import { Switch } from '@/components/ui/switch';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function SwitchColors() {
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);

  return (
    <View style={{ gap: 12 }}>
      <Switch
        label='Default green'
        value={switch1}
        onValueChange={setSwitch1}
      />
      <Switch
        label='Custom blue'
        value={switch2}
        onValueChange={setSwitch2}
        trackColor={{ false: '#e0e0e0', true: '#2196F3' }}
        thumbColor={switch2 ? '#ffffff' : '#f4f3f4'}
      />
      <Switch
        label='Custom purple'
        value={switch3}
        onValueChange={setSwitch3}
        trackColor={{ false: '#e0e0e0', true: '#9C27B0' }}
        thumbColor={switch3 ? '#ffffff' : '#f4f3f4'}
      />
    </View>
  );
}
