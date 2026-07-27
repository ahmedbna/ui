import { Collapsible } from '@/components/ui/collapsible';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function CollapsibleNested() {
  return (
    <Collapsible title='Mobile Development'>
      <Text variant='body' style={{ marginBottom: 16 }}>
        Mobile development encompasses various platforms and technologies:
      </Text>

      <View style={{ gap: 12 }}>
        <Collapsible title='iOS Development'>
          <Text variant='body'>
            iOS development primarily uses Swift or Objective-C with Xcode as
            the main development environment. Apps are distributed through the
            Apple App Store.
          </Text>
        </Collapsible>

        <Collapsible title='Android Development'>
          <Text variant='body'>
            Android development can be done with Java, Kotlin, or cross-platform
            frameworks. Android Studio is the official IDE, and apps are
            distributed through Google Play Store.
          </Text>
        </Collapsible>

        <Collapsible title='Cross-Platform'>
          <Text variant='body'>
            Cross-platform frameworks like React Native, Flutter, and Xamarin
            allow you to write code once and deploy to multiple platforms.
          </Text>
        </Collapsible>
      </View>
    </Collapsible>
  );
}
