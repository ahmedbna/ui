import { Collapsible } from '@/components/ui/collapsible';
import { Text } from '@/components/ui/text';
import React from 'react';

export function CollapsibleDemo() {
  return (
    <Collapsible title='What is React Native?'>
      <Text variant='body'>
        React Native is an open-source UI software framework created by Meta. It
        is used to develop applications for Android, iOS, macOS, tvOS, Web,
        Windows and UWP by enabling developers to use React's framework along
        with native platform capabilities.
      </Text>
    </Collapsible>
  );
}
