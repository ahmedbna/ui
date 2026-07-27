import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TextDemo() {
  return (
    <View style={{ gap: 16 }}>
      <Text variant='heading'>Heading Text</Text>
      <Text variant='title'>Title Text</Text>
      <Text variant='subtitle'>Subtitle Text</Text>
      <Text variant='body'>
        This is body text that demonstrates the default styling for regular
        content.
      </Text>
      <Text variant='caption'>Caption text for additional information</Text>
      <Text variant='link'>Link text with underline</Text>
    </View>
  );
}
