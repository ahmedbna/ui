import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageContentFit() {
  const imageUri = 'https://picsum.photos/600/400?random=30';

  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text variant='caption'>Cover (Default)</Text>

        <Image
          source={{ uri: imageUri }}
          width={150}
          height={100}
          contentFit='cover'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Contain</Text>

        <Image
          source={{ uri: imageUri }}
          width={150}
          height={100}
          contentFit='contain'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Fill</Text>

        <Image
          source={{ uri: imageUri }}
          width={150}
          height={100}
          contentFit='fill'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Scale Down</Text>

        <Image
          source={{ uri: 'https://picsum.photos/100/80?random=31' }}
          width={150}
          height={100}
          contentFit='scale-down'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>None</Text>

        <Image
          source={{ uri: 'https://picsum.photos/100/60?random=32' }}
          width={150}
          height={100}
          contentFit='none'
        />
      </View>
    </View>
  );
}
