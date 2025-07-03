import { Checkbox } from '@/components/ui/checkbox';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function CheckboxCustomStyling() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <View style={{ gap: 16 }}>
      <Checkbox
        checked={checked1}
        onCheckedChange={setChecked1}
        label='Custom styled checkbox'
        labelStyle={{
          fontSize: 18,
          fontWeight: '600',
          color: '#6366f1',
        }}
      />

      <Checkbox
        checked={checked2}
        onCheckedChange={setChecked2}
        label='Another custom style'
        labelStyle={{
          fontSize: 16,
          fontStyle: 'italic',
          color: '#10b981',
        }}
      />
    </View>
  );
}
