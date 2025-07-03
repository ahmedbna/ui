import { MediaPicker } from '@/components/ui/media-picker';
import { Video } from 'lucide-react-native';
import React from 'react';

export function MediaPickerVideos() {
  return (
    <MediaPicker
      mediaType='video'
      buttonText='Select Videos'
      icon={Video}
      variant='secondary'
      onSelectionChange={(assets) => {
        console.log('Selected videos:', assets);
      }}
    />
  );
}
