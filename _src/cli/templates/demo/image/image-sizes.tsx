import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageSizes() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://picsum.photos/150/150' }}
          width={50}
          height={50}
        />
        <Image
          source={{ uri: 'https://picsum.photos/151/151' }}
          width={75}
          height={75}
        />
        <Image
          source={{ uri: 'https://picsum.photos/152/152' }}
          width={100}
          height={100}
        />
        <Image
          source={{ uri: 'https://picsum.photos/153/153' }}
          width={125}
          height={125}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Aspect Ratio Examples</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Image
            source={{ uri: 'https://picsum.photos/400/300' }}
            width={120}
            aspectRatio={4 / 3}
          />
          <Image
            source={{ uri: 'https://picsum.photos/300/400' }}
            width={120}
            aspectRatio={3 / 4}
          />
          <Image
            source={{ uri: 'https://picsum.photos/500/300' }}
            width={120}
            aspectRatio={16 / 9}
          />
        </View>
      </View>
    </View>
  );
}
