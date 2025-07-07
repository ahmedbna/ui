import { MediaPicker } from '@/components/ui/media-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Plus } from 'lucide-react-native';
import React, { useState } from 'react';

export function MediaPickerMultiple() {
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <View style={{ gap: 12 }}>
      <MediaPicker
        mediaType='all'
        multiple={true}
        maxSelection={5}
        buttonText={`Select Media (${selectedCount}/5)`}
        icon={Plus}
        onSelectionChange={(assets) => {
          setSelectedCount(assets.length);
          console.log('Selected assets:', assets);
        }}
      />

      {selectedCount > 0 && (
        <Text variant='caption'>
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </Text>
      )}
    </View>
  );
}
