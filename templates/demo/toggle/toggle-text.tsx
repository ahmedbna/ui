import { Toggle } from '@/components/ui/toggle';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ToggleText() {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(true);
  const [pressed3, setPressed3] = useState(false);

  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Toggle pressed={pressed1} onPressedChange={setPressed1} size='default'>
        Bold
      </Toggle>
      <Toggle
        pressed={pressed2}
        onPressedChange={setPressed2}
        size='default'
        variant='outline'
      >
        Italic
      </Toggle>
      <Toggle pressed={pressed3} onPressedChange={setPressed3} size='default'>
        Underline
      </Toggle>
    </View>
  );
}
