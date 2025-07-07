import { FilePicker, SelectedFile } from '@/components/ui/file-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function FilePickerSingle() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile[]>([]);

  return (
    <View style={{ gap: 12 }}>
      <FilePicker
        onFilesSelected={setSelectedFile}
        onError={(error) => console.error('Error:', error)}
        fileType='document'
        multiple={false}
        maxFiles={1}
        maxSizeBytes={2 * 1024 * 1024} // 2MB
        placeholder='Select a document'
        showFileInfo={true}
      />

      {selectedFile.length > 0 && (
        <View style={{ padding: 12, borderRadius: 8 }}>
          <Text style={{ fontWeight: '500' }}>Selected File:</Text>
          <Text style={{ fontSize: 14 }}>{selectedFile[0].name}</Text>
          {selectedFile[0].size && (
            <Text style={{ fontSize: 12, opacity: 0.7 }}>
              {(selectedFile[0].size / 1024).toFixed(1)} KB
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
