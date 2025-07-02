import { ParallaxScrollView } from '@/components/ui/parallax-scrollview';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

export function ParallaxScrollViewArticle() {
  return (
    <ParallaxScrollView
      headerHeight={280}
      headerImage={
        <View style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
            }}
            style={{ width: '100%', height: '100%' }}
            contentFit='cover'
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
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
            <View
              style={{
                backgroundColor: 'green',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 4,
                alignSelf: 'flex-start',
                marginBottom: 8,
              }}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                TECHNOLOGY
              </Text>
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 32,
                textShadowColor: 'rgba(0,0,0,0.5)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}
            >
              The Future of Mobile Development
            </Text>
            <Text
              style={{
                color: '#e0e0e0',
                fontSize: 14,
                marginTop: 8,
                textShadowColor: 'rgba(0,0,0,0.5)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}
            >
              Published on March 15, 2024 • 8 min read
            </Text>
          </View>
        </View>
      }
    >
      <View style={{ gap: 16 }}>
        <Text variant='caption' style={{ fontSize: 18, lineHeight: 28 }}>
          Mobile development has evolved dramatically over the past decade, with
          new frameworks, tools, and paradigms emerging to meet the ever-growing
          demands of users and businesses alike.
        </Text>

        <Text variant='caption'>
          React Native has established itself as a leading cross-platform
          solution, enabling developers to write once and deploy everywhere. The
          framework's component-based architecture and hot reloading
          capabilities have revolutionized the development experience.
        </Text>

        <View style={{ gap: 8 }}>
          <Text variant='title'>Key Trends in 2024</Text>
          <Text variant='caption'>
            • AI-powered development tools and code generation
          </Text>
          <Text variant='caption'>
            • Enhanced performance optimization techniques
          </Text>
          <Text variant='caption'>
            • Better cross-platform native module integration
          </Text>
          <Text variant='caption'>
            • Improved debugging and testing frameworks
          </Text>
        </View>

        <View
          style={{
            padding: 16,
            borderRadius: 8,
            borderLeftWidth: 4,
            borderLeftColor: '#3b82f6',
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 24, fontStyle: 'italic' }}>
            "The best mobile apps are those that feel native to each platform
            while maintaining a consistent user experience across devices."
          </Text>
        </View>

        <Text variant='caption'>
          Performance optimization remains a critical consideration. Modern apps
          need to handle complex animations, large datasets, and real-time
          updates while maintaining smooth 60fps interactions.
        </Text>

        <View style={{ gap: 8 }}>
          <Text variant='title'>Looking Ahead</Text>
          <Text variant='caption'>
            The future of mobile development is bright, with emerging
            technologies like AR/VR integration, improved offline capabilities,
            and seamless cloud integration opening new possibilities for
            developers and users alike.
          </Text>
        </View>

        <View
          style={{
            borderTopWidth: 0.5,
            borderTopColor: '#e5e7eb',
            paddingTop: 16,
            marginTop: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#3b82f6',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>JD</Text>
            </View>
            <View>
              <Text style={{ fontWeight: '600' }}>John Developer</Text>
              <Text style={{ color: '#6b7280', fontSize: 14 }}>
                Senior Mobile Engineer
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}
