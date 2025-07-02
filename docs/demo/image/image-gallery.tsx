import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { ScrollView } from 'react-native';

export function ImageGallery() {
  const images = [
    'https://picsum.photos/300/200?random=10',
    'https://picsum.photos/300/200?random=11',
    'https://picsum.photos/300/200?random=12',
    'https://picsum.photos/300/200?random=13',
    'https://picsum.photos/300/200?random=14',
    'https://picsum.photos/300/200?random=15',
  ];

  return (
    <View style={{ gap: 16 }}>
      <Text variant='caption'>Grid Gallery</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'space-between',
        }}
      >
        {images.slice(0, 4).map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            width={90}
            height={90}
            style={{ borderRadius: 8 }}
          />
        ))}
      </View>

      <Text variant='caption'>Horizontal Scroll Gallery</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            width={150}
            height={100}
            style={{ borderRadius: 8 }}
          />
        ))}
      </ScrollView>

      <Text variant='caption'>Featured Image</Text>
      <Image
        source={{ uri: 'https://picsum.photos/800/400?random=99' }}
        width='100%'
        aspectRatio={2}
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}
