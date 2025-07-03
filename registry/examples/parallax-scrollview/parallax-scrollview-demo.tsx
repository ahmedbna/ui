import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Image } from 'expo-image';
import React from 'react';

export function ParallaxScrollViewDemo() {
  return (
    <ParallaxScrollView
      headerHeight={460}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
        />
      }
    >
      <View style={{ gap: 16 }}>
        <Text variant='heading'>Parallax Scroll View</Text>
        <Text>
          This is a basic example of a parallax scroll view. The header image
          moves at a different speed than the content as you scroll, creating a
          beautiful parallax effect.
        </Text>
        <Text>
          Scroll up and down to see the parallax animation in action. The header
          will transform and scale based on your scroll position.
        </Text>
        <Text>
          You can also try pulling down (over-scrolling) to see the header scale
          up beyond its normal size.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
