import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ImageVariants() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          variant='rounded'
          width={200}
          aspectRatio={1}
        />
        <Text variant='caption'>Rounded</Text>
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1575737698350-52e966f924d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          width={200}
          height={200}
          variant='circle'
        />
        <Text variant='caption'>Circle</Text>
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1667830867718-da7f5a45d20d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          width={200}
          height={200}
          variant='default'
        />
        <Text variant='caption'>Default</Text>
      </View>
    </View>
  );
}
