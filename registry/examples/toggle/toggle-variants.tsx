import { Toggle } from '@/components/ui/toggle';
import { View } from '@/components/ui/view';
import { Bold, Italic } from 'lucide-react-native';
import React, { useState } from 'react';

export function ToggleVariants() {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(true);
  const [pressed3, setPressed3] = useState(false);
  const [pressed4, setPressed4] = useState(true);

  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Toggle
        pressed={pressed1}
        onPressedChange={setPressed1}
        variant='default'
      >
        <Bold size={16} />
      </Toggle>
      <Toggle
        pressed={pressed2}
        onPressedChange={setPressed2}
        variant='default'
      >
        <Italic size={16} />
      </Toggle>
      <Toggle
        pressed={pressed3}
        onPressedChange={setPressed3}
        variant='outline'
      >
        <Bold size={16} />
      </Toggle>
      <Toggle
        pressed={pressed4}
        onPressedChange={setPressed4}
        variant='outline'
      >
        <Italic size={16} />
      </Toggle>
    </View>
  );
}
