import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

export function ParallaxScrollViewGradient() {
  return (
    <ParallaxScrollView
      headerHeight={300}
      headerImage={
        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1575737698350-52e966f924d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={{ width: '100%', height: '100%' }}
            contentFit='cover'
          />
          <LinearGradient
            colors={['transparent', 'black']}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                textShadowColor: 'rgba(0,0,0,0.5)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Scenic Mountain View
            </Text>
          </View>
        </View>
      }
    >
      <View style={{ gap: 16 }}>
        <Text variant='heading'>Gradient Overlay Header</Text>
        <Text>
          This example shows how to add a gradient overlay to your header image,
          which is perfect for ensuring text readability over images.
        </Text>
        <Text>
          The gradient creates a smooth transition from the image to a darker
          overlay at the bottom, where you can place text or other UI elements.
        </Text>
        <Text>
          This technique is commonly used in hero sections, article headers, and
          profile screens where you need to overlay content on images.
        </Text>

        <Text>
          The parallax effect works seamlessly with gradient overlays and
          maintains smooth performance even with multiple layers.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
