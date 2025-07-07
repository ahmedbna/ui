import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

const gridImages: GalleryItem[] = [
  {
    id: '1',
    uri: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'City Skyline',
    description: 'Modern architecture at sunset',
    thumbnail:
      'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    uri: 'https://images.unsplash.com/photo-1644190022446-04b99df7259a?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Winter Wonderland',
    description: 'Snow-covered peaks and pristine wilderness',
    thumbnail:
      'https://images.unsplash.com/photo-1644190022446-04b99df7259a?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    uri: 'https://images.unsplash.com/photo-1717732596477-04f8c5d53387?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Ocean Waves',
    description: 'Peaceful ocean scene with rolling waves',
    thumbnail:
      'https://images.unsplash.com/photo-1717732596477-04f8c5d53387?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    uri: 'https://images.unsplash.com/photo-1575737698350-52e966f924d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Forest Path',
    description: 'A winding path through ancient trees',
    thumbnail:
      'https://images.unsplash.com/photo-1575737698350-52e966f924d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    uri: 'https://images.unsplash.com/photo-1667830867718-da7f5a45d20d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon',
    thumbnail:
      'https://images.unsplash.com/photo-1667830867718-da7f5a45d20d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '6',
    uri: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Beautiful Landscape',
    description: 'A stunning view of mountains and valleys',
    thumbnail:
      'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=2334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export function GalleryGrid() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          4 Columns, No Spacing
        </Text>
        <Gallery
          items={gridImages}
          columns={4}
          spacing={0}
          borderRadius={0}
          aspectRatio={1}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          3 Columns with Spacing
        </Text>

        <Gallery
          items={gridImages.slice(0, 6)}
          columns={3}
          spacing={12}
          borderRadius={8}
          aspectRatio={1.2}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text variant='subtitle' style={{ marginBottom: 12 }}>
          2 Columns, Large Spacing
        </Text>
        <Gallery
          items={gridImages.slice(0, 4)}
          columns={2}
          spacing={20}
          borderRadius={16}
          aspectRatio={0.8}
        />
      </View>
    </ScrollView>
  );
}
