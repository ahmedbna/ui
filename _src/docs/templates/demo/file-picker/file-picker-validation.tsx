import { FilePicker, SelectedFile } from '@/components/ui/file-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function FilePickerValidation() {
  const [error, setError] = useState('');
  const [files, setFiles] = useState<SelectedFile[]>([]);

  return (
    <View style={{ gap: 12 }}>
      <FilePicker
        onFilesSelected={(files) => {
          setFiles(files);
          setError('');
        }}
        onError={setError}
        fileType='all'
        multiple={true}
        maxFiles={2}
        maxSizeBytes={1 * 1024 * 1024} // 1MB limit
        allowedExtensions={['pdf', 'doc', 'docx', 'txt']}
        placeholder='Select (PDF, DOC, DOCX, TXT only)'
        showFileInfo={true}
      />

      {error && (
        <View
          style={{
            padding: 12,
            backgroundColor: '#ffeaea',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ffcaca',
          }}
        >
          <Text style={{ color: '#d32f2f', fontSize: 14 }}>{error}</Text>
        </View>
      )}

      {files.length > 0 && !error && (
        <View
          style={{
            padding: 12,
            backgroundColor: '#e8f5e8',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#c8e6c9',
          }}
        >
          <Text style={{ color: '#2e7d32', fontSize: 14, fontWeight: '500' }}>
            ✓ Files validated successfully
          </Text>
          <Text style={{ color: '#2e7d32', fontSize: 12, marginTop: 4 }}>
            {files.length} file{files.length > 1 ? 's' : ''} ready for upload
          </Text>
        </View>
      )}
    </View>
  );
}
