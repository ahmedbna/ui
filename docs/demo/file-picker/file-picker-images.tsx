import { FilePicker, SelectedFile } from '@/components/ui/file-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function FilePickerImages() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);

  return (
    <View style={{ gap: 12 }}>
      <FilePicker
        onFilesSelected={setSelectedFiles}
        onError={(error) => console.error('Error:', error)}
        fileType='image'
        multiple={true}
        maxFiles={3}
        maxSizeBytes={5 * 1024 * 1024} // 5MB
        allowedExtensions={['jpg', 'jpeg', 'png', 'gif', 'webp']}
        placeholder='Select images (max 3)'
        showFileInfo={true}
      />
      {selectedFiles.length > 0 && (
        <Text style={{ fontSize: 14, opacity: 0.7 }}>
          {selectedFiles.length} image{selectedFiles.length > 1 ? 's' : ''}{' '}
          selected
        </Text>
      )}
    </View>
  );
}
