import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/theme/globals';
import { Image } from 'expo-image';
import React from 'react';

export function CarouselImages() {
  const images = [
    {
      uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      title: 'Mountain Landscape',
      description: 'Breathtaking mountain views',
    },
    {
      uri: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
      title: 'Forest Path',
      description: 'Peaceful forest walking trail',
    },
    {
      uri: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=300&fit=crop',
      title: 'Ocean Sunset',
      description: 'Golden hour by the sea',
    },
    {
      uri: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop',
      title: 'Desert Dunes',
      description: 'Vast desert landscape',
    },
  ];

  return (
    <Carousel autoPlay autoPlayInterval={5000} showIndicators showArrows loop>
      {images.map((image, index) => (
        <CarouselItem key={index} style={{ padding: 0 }}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: image.uri }}
              style={{
                width: '100%',
                height: 240,
                borderRadius: BORDER_RADIUS,
              }}
              contentFit='cover'
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderBottomLeftRadius: BORDER_RADIUS,
                borderBottomRightRadius: BORDER_RADIUS,
                padding: 16,
              }}
            >
              <Text
                variant='title'
                style={{
                  color: 'white',
                  fontSize: 18,
                  marginBottom: 4,
                }}
              >
                {image.title}
              </Text>
              <Text
                style={{
                  color: 'white',
                  opacity: 0.9,
                  fontSize: 14,
                }}
              >
                {image.description}
              </Text>
            </View>
          </View>
        </CarouselItem>
      ))}
    </Carousel>
  );
}
