import { Button } from '@/components/ui/button';
import { useFilePicker } from '@/components/ui/file-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function FilePickerControlled() {
  const {
    files,
    addFiles,
    removeFile,
    clearFiles,
    totalSize,
    isValid,
    errors,
  } = useFilePicker({
    maxFiles: 3,
    maxSizeBytes: 2 * 1024 * 1024, // 2MB
    allowedExtensions: ['pdf', 'jpg', 'png', 'doc'],
    onError: (error) => console.error('Validation error:', error),
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Simulate adding files (in real app, this would come from file picker)
  const simulateAddFiles = () => {
    const mockFiles = [
      { uri: 'file://test1.pdf', name: 'test1.pdf', size: 150000 },
      { uri: 'file://test2.jpg', name: 'test2.jpg', size: 250000 },
    ];
    addFiles(mockFiles);
  };

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button
          onPress={simulateAddFiles}
          style={{ flex: 1 }}
          variant='outline'
        >
          <Text>Add Mock Files</Text>
        </Button>
        <Button
          onPress={clearFiles}
          style={{ flex: 1 }}
          variant='outline'
          disabled={files.length === 0}
        >
          <Text>Clear All</Text>
        </Button>
      </View>

      {/* Status Info */}
      <View
        style={{
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: '500' }}>Status</Text>
        <Text style={{ fontSize: 14 }}>Files: {files.length}/3</Text>
        <Text style={{ fontSize: 14 }}>
          Total Size: {formatSize(totalSize)}
        </Text>
        <Text style={{ fontSize: 14 }}>Valid: {isValid ? '✓' : '✗'}</Text>
      </View>

      {/* Errors */}
      {errors.length > 0 && (
        <View
          style={{
            padding: 12,
            backgroundColor: '#ffeaea',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#d32f2f', fontWeight: '500' }}>Errors:</Text>
          {errors.map((error, index) => (
            <Text key={index} style={{ color: '#d32f2f', fontSize: 14 }}>
              • {error}
            </Text>
          ))}
        </View>
      )}

      {/* Files List */}
      {files.length > 0 && (
        <View>
          <Text style={{ fontWeight: '500', marginBottom: 8 }}>
            Selected Files:
          </Text>
          {files.map((file, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8,
                borderRadius: 6,
                marginBottom: 4,
                borderWidth: 1,
                borderColor: '#e0e0e0',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500' }}>
                  {file.name}
                </Text>
                {file.size && (
                  <Text style={{ fontSize: 12, opacity: 0.7 }}>
                    {formatSize(file.size)}
                  </Text>
                )}
              </View>
              <Button
                onPress={() => removeFile(index)}
                variant='ghost'
                style={{ padding: 4 }}
              >
                <Text style={{ color: '#d32f2f' }}>Remove</Text>
              </Button>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
