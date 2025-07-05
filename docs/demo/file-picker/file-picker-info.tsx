import { FilePicker, SelectedFile } from '@/components/ui/file-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';

export function FilePickerInfo() {
  const card = useThemeColor({}, 'card');
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<any>({});

  const handleFilesSelected = (selectedFiles: SelectedFile[]) => {
    setFiles(selectedFiles);
    // Simulate upload progress
    selectedFiles.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress((prev: any) => ({
          ...prev,
          [index]: Math.min(progress, 100),
        }));
      }, 200);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileTypeIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';

    const typeMap: Record<string, string> = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      txt: '📄',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      zip: '📦',
      rar: '📦',
      mp4: '🎥',
      mp3: '🎵',
    };

    return typeMap[ext] || '📎';
  };

  return (
    <View style={{ gap: 16 }}>
      <FilePicker
        onFilesSelected={handleFilesSelected}
        onError={(error) => console.error('Error:', error)}
        fileType='all'
        multiple={true}
        maxFiles={4}
        maxSizeBytes={5 * 1024 * 1024} // 5MB
        placeholder='Select files for detailed preview'
        showFileInfo={true}
      />

      {files.length > 0 && (
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            File Details
          </Text>

          {files.map((file, index) => (
            <View
              key={index}
              style={{
                padding: 16,
                backgroundColor: card,
                borderRadius: 12,
                marginBottom: 12,

                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <Text style={{ fontSize: 24 }}>
                  {getFileTypeIcon(file.name)}
                </Text>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: '500', marginBottom: 4 }}
                  >
                    {file.name}
                  </Text>

                  <View style={{ gap: 2 }}>
                    {file.size && (
                      <Text variant='caption' style={{ fontSize: 14 }}>
                        Size: {formatFileSize(file.size)}
                      </Text>
                    )}

                    {file.mimeType && (
                      <Text variant='caption' style={{ fontSize: 14 }}>
                        Type: {file.mimeType}
                      </Text>
                    )}

                    <Text variant='caption' style={{ fontSize: 14 }}>
                      Status:{' '}
                      {uploadProgress[index] >= 100
                        ? 'Uploaded'
                        : 'Uploading...'}
                    </Text>
                  </View>

                  {/* Progress Bar */}
                  {uploadProgress[index] !== undefined && (
                    <View style={{ marginTop: 8 }}>
                      <View
                        style={{
                          height: 4,
                          backgroundColor: '#e0e0e0',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <View
                          style={{
                            height: '100%',
                            width: `${uploadProgress[index] || 0}%`,
                            backgroundColor:
                              uploadProgress[index] >= 100
                                ? '#4CAF50'
                                : '#2196F3',
                            borderRadius: 2,
                          }}
                        />
                      </View>
                      <Text
                        variant='caption'
                        style={{ fontSize: 12, marginTop: 4 }}
                      >
                        {Math.round(uploadProgress[index] || 0)}%
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}

          {/* Summary */}
          <View
            style={{
              padding: 12,
              backgroundColor: '#f0f8ff',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e3f2fd',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#1976d2' }}>
              Summary
            </Text>
            <Text style={{ fontSize: 14, color: '#1976d2' }}>
              {files.length} file{files.length > 1 ? 's' : ''} • Total size:{' '}
              {formatFileSize(
                files.reduce((sum, file) => sum + (file.size || 0), 0)
              )}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
