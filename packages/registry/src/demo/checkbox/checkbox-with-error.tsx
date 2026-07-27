import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function CheckboxWithError() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={{ gap: 8 }}>
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label='I agree to the terms'
        error='You must accept the terms to continue'
      />
      {!checked && (
        <Text variant='caption' style={{ color: 'red', marginLeft: 28 }}>
          You must accept the terms to continue
        </Text>
      )}
    </View>
  );
}
