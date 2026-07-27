import { MediaAsset, MediaPicker } from '@/components/ui/media-picker';
import { Folder } from 'lucide-react-native';
import React, { useState } from 'react';

export function MediaPickerGallery() {
  const [selected, setSelected] = useState<MediaAsset[]>([]);

  return (
    <MediaPicker
      mediaType='all'
      gallery={true}
      multiple={true}
      maxSelection={8}
      buttonText='Open Gallery'
      icon={Folder}
      variant='outline'
      selectedAssets={selected}
      onSelectionChange={setSelected}
    />
  );
}
