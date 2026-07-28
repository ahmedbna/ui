// Example usage of the Gallery component

import { Gallery, type GalleryItem } from '@/components/ui/gallery';
import { Text } from '@/components/ui/text';
import { File, Paths } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import React from 'react';
import { Alert, ScrollView, Share, StyleSheet, View } from 'react-native';

// Sample data
const sampleImages: GalleryItem[] = [
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

export function GalleryDemo() {
  const handleDownload = async (item: GalleryItem) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission needed',
          'Please grant media library permissions to download images.'
        );
        return;
      }

      const destination = new File(Paths.document, `${item.id}.jpg`);
      const downloaded = await File.downloadFileAsync(item.uri, destination);

      const asset = await MediaLibrary.Asset.create(downloaded.uri);
      await MediaLibrary.Album.create('Gallery Downloads', [asset], false);

      Alert.alert('Success', 'Image downloaded to your gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to download image');
    }
  };

  const handleShare = async (item: GalleryItem) => {
    try {
      await Share.share({
        message: `Check out this image: ${item.title || 'Shared from Gallery'}`,
        url: item.uri,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share image');
    }
  };

  const handleItemPress = (item: GalleryItem, index: number) => {
    console.log('Item pressed:', item.title, 'at index:', index);
  };

  const aspectRatios = [0.8, 1.2, 1.0, 1.5, 0.9, 1.1]; // Varied ratios

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text variant='heading' style={styles.title}>
        Gallery demo
      </Text>

      {/* Basic Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Basic Gallery (2 columns)
        </Text>

        <Gallery items={sampleImages} columns={3} spacing={2} />
      </View>

      {/* Gallery with custom functionality */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          With Download & Share
        </Text>

        <Gallery
          items={sampleImages.slice(0, 6)}
          columns={3}
          aspectRatio={1}
          enableDownload
          enableShare
          onDownload={handleDownload}
          onShare={handleShare}
          spacing={0}
        />
      </View>

      {/* Gallery with titles and descriptions */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          With Titles & Descriptions
        </Text>

        <Gallery
          items={sampleImages}
          columns={2}
          aspectRatio={1.5}
          showTitles
          showDescriptions
          spacing={16}
        />
      </View>

      {/* Gallery with custom overlay */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          With Custom Overlay
        </Text>

        <Gallery
          items={sampleImages}
          columns={2}
          aspectRatio={1}
          renderCustomOverlay={(item) => (
            <View style={styles.customOverlay}>
              <Text variant='caption' style={styles.overlayText}>
                {item.title}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Compact Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Compact Grid (4 columns)
        </Text>

        <Gallery
          items={sampleImages}
          columns={6}
          aspectRatio={1}
          spacing={4}
          enableZoom={false}
        />
      </View>

      {/* Minimal Gallery */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Minimal Gallery (No Fullscreen)
        </Text>

        <Gallery
          items={sampleImages}
          columns={3}
          spacing={6}
          aspectRatio={1}
          enableFullscreen={false}
        />
      </View>

      {/* Empty state demo */}
      <View style={styles.section}>
        <Text variant='title' style={styles.sectionTitle}>
          Empty Gallery
        </Text>

        <Gallery items={[]} columns={2} spacing={8} aspectRatio={1} />
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 100,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  masonryItem: {
    marginBottom: 8,
  },
  customOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 50,
  },
});
