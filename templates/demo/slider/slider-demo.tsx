import { Slider } from '@/components/ui/slider';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';

export function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <View style={{ gap: 20, width: '100%' }}>
      <Text>Value: {value}</Text>
      <Slider
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        maximumValue={100}
        step={1}
      />
    </View>
  );
}
