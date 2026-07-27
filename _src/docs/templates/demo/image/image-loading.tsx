import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageLoading() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text variant='caption'>Small Loading Indicator</Text>
        <Image
          source={{ uri: 'https://picsum.photos/400/300?random=1' }}
          width={200}
          height={150}
          loadingIndicatorSize='small'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Large Loading Indicator</Text>
        <Image
          source={{ uri: 'https://picsum.photos/400/300?random=2' }}
          width={200}
          height={150}
          loadingIndicatorSize='large'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Custom Loading Color</Text>
        <Image
          source={{ uri: 'https://picsum.photos/400/300?random=3' }}
          width={200}
          height={150}
          loadingIndicatorColor='#FF6B6B'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>No Loading Indicator</Text>
        <Image
          source={{ uri: 'https://picsum.photos/400/300?random=4' }}
          width={200}
          height={150}
          showLoadingIndicator={false}
        />
      </View>
    </View>
  );
}
