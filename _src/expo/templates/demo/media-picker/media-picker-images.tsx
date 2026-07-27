import { MediaPicker } from '@/components/ui/media-picker';
import { Image } from 'lucide-react-native';
import React from 'react';

export function MediaPickerImages() {
  return (
    <MediaPicker
      mediaType='image'
      buttonText='Select Images'
      icon={Image}
      variant='outline'
      onSelectionChange={(assets) => {
        console.log('Selected images:', assets);
      }}
    />
  );
}
