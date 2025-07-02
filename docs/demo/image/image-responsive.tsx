import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageResponsive() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text variant='caption'>Full Width (Container Responsive)</Text>

        <Image
          source={{ uri: 'https://picsum.photos/800/300?random=20' }}
          aspectRatio={8 / 3}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Percentage Width</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Image
            source={{ uri: 'https://picsum.photos/400/300?random=21' }}
            width='48%'
            aspectRatio={4 / 3}
          />
          <Image
            source={{ uri: 'https://picsum.photos/400/300?random=22' }}
            width='48%'
            aspectRatio={4 / 3}
          />
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Flex Layout</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 2 }}>
            <Image
              source={{ uri: 'https://picsum.photos/600/400?random=23' }}
              aspectRatio={3 / 2}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: 'https://picsum.photos/300/400?random=24' }}
              aspectRatio={3 / 4}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
