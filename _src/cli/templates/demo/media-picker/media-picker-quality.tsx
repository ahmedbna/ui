import { MediaPicker } from '@/components/ui/media-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Settings } from 'lucide-react-native';
import React from 'react';

export function MediaPickerQuality() {
  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text variant='title' style={{ marginBottom: 8 }}>
          High Quality
        </Text>
        <MediaPicker
          mediaType='image'
          quality='high'
          buttonText='High Quality Images'
          icon={Settings}
          variant='outline'
          size='sm'
          onSelectionChange={(assets) => {
            console.log('High quality assets:', assets);
          }}
        />
      </View>

      <View>
        <Text variant='title' style={{ marginBottom: 8 }}>
          Medium Quality
        </Text>
        <MediaPicker
          mediaType='image'
          quality='medium'
          buttonText='Medium Quality Images'
          icon={Settings}
          variant='secondary'
          size='sm'
          onSelectionChange={(assets) => {
            console.log('Medium quality assets:', assets);
          }}
        />
      </View>

      <View>
        <Text variant='title' style={{ marginBottom: 8 }}>
          Low Quality
        </Text>
        <MediaPicker
          mediaType='image'
          quality='low'
          buttonText='Low Quality Images'
          icon={Settings}
          variant='ghost'
          size='sm'
          onSelectionChange={(assets) => {
            console.log('Low quality assets:', assets);
          }}
        />
      </View>
    </View>
  );
}
