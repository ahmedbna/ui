import { MediaAsset, MediaPicker } from '@/components/ui/media-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ImageIcon } from 'lucide-react-native';
import React, { useState } from 'react';

export function MediaPickerPreview() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);

  return (
    <View style={{ gap: 16 }}>
      <MediaPicker
        mediaType='all'
        multiple={true}
        maxSelection={6}
        showPreview={true}
        previewSize={100}
        buttonText='Add Media'
        icon={ImageIcon}
        selectedAssets={assets}
        onSelectionChange={(newAssets) => {
          setAssets(newAssets);
          console.log('Assets with preview:', newAssets);
        }}
      />

      {assets.length > 0 && (
        <View>
          <Text variant='caption'>
            {assets.length} item{assets.length !== 1 ? 's' : ''} selected
          </Text>
          <Text variant='caption'>
            Types: {assets.map((a) => a.type).join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
}
