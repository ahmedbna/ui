import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Image } from 'expo-image';
import React from 'react';

export function ParallaxScrollViewCustomHeight() {
  return (
    <ParallaxScrollView
      headerHeight={500}
      headerImage={
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1644190022446-04b99df7259a?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={{ width: '100%', height: '100%' }}
          contentFit='cover'
        />
      }
    >
      <View style={{ gap: 16 }}>
        <Text variant='heading'>Custom Header Height</Text>
        <Text>
          This example demonstrates a taller header (500px) that provides more
          visual impact and space for the parallax effect.
        </Text>
        <Text>
          Larger headers work great for hero sections, profile pages, or any
          screen where you want to make a strong visual impression.
        </Text>
        <Text>
          The parallax animation remains smooth regardless of the header size,
          automatically adjusting the transformation values based on the
          specified height.
        </Text>

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
