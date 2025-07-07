import { Toggle } from '@/components/ui/toggle';
import { View } from '@/components/ui/view';
import { Bold } from 'lucide-react-native';
import React, { useState } from 'react';

export function ToggleSizes() {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(true);

  return (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Toggle pressed={pressed1} onPressedChange={setPressed1} size='icon'>
        <Bold size={16} />
      </Toggle>
      <Toggle pressed={pressed2} onPressedChange={setPressed2} size='default'>
        Bold
      </Toggle>
    </View>
  );
}
