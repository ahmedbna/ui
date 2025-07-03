import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function CheckboxStates() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  return (
    <View style={{ gap: 16 }}>
      <Text variant='subtitle' style={{ marginBottom: 8 }}>
        Different States
      </Text>

      <Checkbox
        checked={checked1}
        onCheckedChange={setChecked1}
        label='Unchecked'
      />

      <Checkbox
        checked={checked2}
        onCheckedChange={setChecked2}
        label='Checked'
      />

      <Checkbox
        checked={checked3}
        onCheckedChange={setChecked3}
        label='Disabled'
        disabled
      />
    </View>
  );
}
