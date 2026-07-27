import { MediaAsset, MediaPicker } from '@/components/ui/media-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export function MediaPickerDemo() {
  const [selectedImages, setSelectedImages] = useState<MediaAsset[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<MediaAsset[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<MediaAsset[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset[]>([]);
  const [singleAsset, setSingleAsset] = useState<MediaAsset[]>([]);

  const handleError = (error: string) => {
    console.error('MediaPicker Error:', error);
    // You could show a toast or alert here
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Multiple Image Selection */}
      <View style={styles.section}>
        <Text variant='title'>Multiple Image Selection</Text>
        <Text variant='caption' style={styles.description}>
          Select up to 5 images with preview
        </Text>
        <MediaPicker
          mediaType='image'
          multiple
          maxSelection={5}
          selectedAssets={selectedImages}
          onSelectionChange={setSelectedImages}
          onError={handleError}
          buttonText={`Select Images (${selectedImages.length}/5)`}
          showPreview
          previewSize={100}
        />
      </View>

      <View style={styles.section}>
        <Text variant='title'>Multiple Image Gallery</Text>
        <Text variant='caption' style={styles.description}>
          Select up to 5 images with preview
        </Text>
        <MediaPicker
          gallery
          mediaType='image'
          multiple
          maxSelection={5}
          selectedAssets={selectedGallery}
          onSelectionChange={setSelectedGallery}
          onError={handleError}
          showPreview
          previewSize={100}
        />
      </View>

      {/* Compact Variant */}
      <View style={styles.section}>
        <Text variant='title'>Video Picker</Text>
        <Text variant='caption' style={styles.description}>
          Space-efficient compact variant
        </Text>
        <MediaPicker
          mediaType='video'
          multiple
          gallery
          maxSelection={10}
          selectedAssets={selectedVideos}
          onSelectionChange={setSelectedVideos}
          onError={handleError}
          showPreview
          previewSize={100}
        />
      </View>

      {/* Basic Button Variant */}
      <View style={styles.section}>
        <Text variant='title'>Basic Media Picker</Text>
        <Text variant='caption' style={styles.description}>
          Default button variant with single selection
        </Text>

        <MediaPicker
          onSelectionChange={setSingleAsset}
          onError={handleError}
          buttonText='Select Media'
        />
        {singleAsset.length > 0 && (
          <Text variant='caption'>
            Selected: {singleAsset[0].type} -{' '}
            {singleAsset[0].filename || 'Unknown'}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  description: {
    marginBottom: 12,
    marginTop: 4,
  },
  customPicker: {
    marginTop: 8,
  },
});

/*
MediaPicker Component Documentation:

PROPS:
- mediaType: 'image' | 'video' | 'all' (default: 'all')
- allowsMultipleSelection: boolean (default: false)
- maxSelection: number (default: 10)
- quality: 'low' | 'medium' | 'high' (default: 'medium')
- onSelectionChange: (assets: MediaAsset[]) => void
- onError: (error: string) => void
- variant: 'button' | 'gallery' | 'compact' (default: 'button')
- buttonText: string
- placeholder: string (default: 'Select media')
- showPreview: boolean (default: true)
- previewSize: number (default: 80)
- style: ViewStyle
- disabled: boolean (default: false)
- selectedAssets: MediaAsset[] (for controlled component)

VARIANTS:
1. 'button' - Default button that opens action sheet with Camera/Gallery options
2. 'gallery' - Opens a custom gallery modal with grid view of media
3. 'compact' - Small circular button with dashed border, space-efficient

FEATURES:
- Camera and gallery access
- Image and video support
- Multiple selection with customizable limits
- Preview thumbnails with remove functionality
- Permission handling
- Error handling
- TypeScript support
- Theme integration
- Responsive design
- Platform-specific optimizations

MEDIAASSET INTERFACE:
{
  id: string;
  uri: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
  duration?: number;
  filename?: string;
  fileSize?: number;
}

REQUIRED DEPENDENCIES:
- expo-image-picker
- expo-media-library
- expo-image
- lucide-react-native

PERMISSIONS:
The component automatically requests:
- Camera permissions (when using camera)
- Media library permissions (for gallery access)

USAGE TIPS:
1. Always handle the onError callback for better UX
2. Use selectedAssets prop for controlled components
3. Set appropriate maxSelection limits for performance
4. Consider using 'compact' variant in forms or tight spaces
5. The 'gallery' variant provides the most control over selection UI
*/
