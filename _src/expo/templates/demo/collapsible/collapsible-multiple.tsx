import { Collapsible } from '@/components/ui/collapsible';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function CollapsibleMultiple() {
  return (
    <View style={{ gap: 16 }}>
      <Collapsible title='Getting Started'>
        <Text variant='body'>
          To get started with React Native, you'll need to set up your
          development environment. This includes installing Node.js, React
          Native CLI, and either Android Studio or Xcode.
        </Text>
      </Collapsible>

      <Collapsible title='Components'>
        <Text variant='body'>
          React Native provides many built-in components like View, Text,
          ScrollView, TextInput, and more. You can also create custom components
          to build your app's interface.
        </Text>
      </Collapsible>

      <Collapsible title='Navigation'>
        <Text variant='body'>
          For navigation between screens, React Navigation is the most popular
          solution. It provides stack, tab, and drawer navigation patterns that
          work seamlessly with React Native.
        </Text>
      </Collapsible>
    </View>
  );
}
