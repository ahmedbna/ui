import { LazyImage } from '@/components/ui/lazy-image';
import { View } from '@/components/ui/view';
import React from 'react';

export function LazyImageDemo() {
  return (
    <View style={{ gap: 20, height: 300 }}>
      <LazyImage
        source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' }}
        style={{ width: '100%', height: 200, borderRadius: 12 }}
        contentFit="cover"
      />
    </View>
  );
}
