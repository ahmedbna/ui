import { MediaPicker } from '@/components/ui/media-picker';
import React from 'react';

export function MediaPickerDemo() {
  return (
    <MediaPicker
      mediaType='all'
      onSelectionChange={(assets) => {
        console.log('Selected assets:', assets);
      }}
      onError={(error) => {
        console.error('Media picker error:', error);
      }}
    />
  );
}
