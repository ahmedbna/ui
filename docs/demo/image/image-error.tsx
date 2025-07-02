import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageError() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text variant='caption'>Default Error Fallback</Text>
        <Image
          source={{ uri: 'https://invalid-url-that-will-fail.com/image.jpg' }}
          width={200}
          height={150}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Custom Error Message</Text>
        <Image
          source={{ uri: 'https://another-invalid-url.com/image.jpg' }}
          width={200}
          height={150}
          errorFallbackText='Oops! Image not found'
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>No Error Fallback</Text>
        <Image
          source={{ uri: 'https://yet-another-invalid-url.com/image.jpg' }}
          width={200}
          height={150}
          showErrorFallback={false}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text variant='caption'>Circle Variant with Error</Text>
        <Image
          source={{ uri: 'https://broken-image-url.com/avatar.jpg' }}
          width={100}
          height={100}
          variant='circle'
          errorFallbackText='No Avatar'
        />
      </View>
    </View>
  );
}
