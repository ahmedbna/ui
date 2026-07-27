import { useColor } from '@/hooks/useColor';
import { CORNERS, HEIGHT } from '@/theme/globals';
import * as DocumentPicker from 'expo-document-picker';
import { Trash2 } from 'lucide-react-native';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/button';
import { SelectedFile, useFilePicker } from '@/components/ui/file-picker';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

interface FilePickerProps {
  maxFiles?: number;
  maxSizeBytes?: number;
  allowedExtensions?: string[];
}

export function FilePickerHook({
  maxFiles = 5,
  maxSizeBytes = 5 * 1024 * 1024, // 5MB
  allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
}: FilePickerProps) {
  const card = useColor('card');
  const muted = useColor('muted');

  const {
    files,
    addFiles,
    removeFile,
    clearFiles,
    totalSize,
    isValid,
    errors,
  } = useFilePicker({
    maxFiles,
    maxSizeBytes,
    allowedExtensions,
    onError: (error) => {
      Alert.alert('File Selection Error', error);
    },
  });

  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        // Convert DocumentPicker result to SelectedFile format
        const selectedFiles: SelectedFile[] = result.assets.map((asset) => ({
          name: asset.name,
          uri: asset.uri,
          size: asset.size,
          type: asset.file?.type,
          mimeType: asset.mimeType,
        }));

        addFiles(selectedFiles);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick files');
      console.error('DocumentPicker Error:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'mp4':
      case 'mov':
        return '🎥';
      case 'mp3':
      case 'wav':
        return '🎵';
      default:
        return '📎';
    }
  };

  return (
    <View style={styles.container}>
      <Text variant='title'>File Picker Hook</Text>

      {/* Pick Files Button */}
      <Button variant='secondary' onPress={pickFiles}>
        {`📁 Select Files (${files.length}/${maxFiles})`}
      </Button>

      {/* File Statistics */}
      {files.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Total Size: {formatFileSize(totalSize)}
          </Text>
          <Text
            style={[styles.statsText, { color: isValid ? 'green' : 'red' }]}
          >
            Status: {isValid ? 'Valid' : 'Invalid'}
          </Text>
        </View>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <View style={styles.errorContainer}>
          {errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              ⚠️ {error}
            </Text>
          ))}
        </View>
      )}

      {/* Selected Files List */}
      <ScrollView style={styles.filesList}>
        {files.map((file, index) => (
          <View key={index} style={{ margin: 8 }}>
            <View
              style={{
                width: '100%',
                backgroundColor: card,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: CORNERS,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: CORNERS,
                  gap: 16,
                }}
              >
                <View
                  style={{
                    height: HEIGHT,
                    width: HEIGHT,
                    borderRadius: CORNERS,
                    backgroundColor: muted,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text>{getFileIcon(file.name)}</Text>
                </View>
                <View>
                  <Text numberOfLines={1}>{file.name}</Text>
                  <Text>
                    {file.size ? formatFileSize(file.size) : 'Unknown size'}
                  </Text>
                  {file.mimeType && <Text>{file.mimeType}</Text>}
                </View>
              </View>
              <Button
                size='icon'
                variant='destructive'
                onPress={() => removeFile(index)}
              >
                <Trash2 />
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      {files.length > 0 && (
        <View style={styles.actionButtons}>
          <Button variant='destructive' onPress={clearFiles}>
            Clear All
          </Button>

          <Button
            onPress={() => {
              if (isValid) {
                Alert.alert('Upload', `Ready to upload ${files.length} files`);
              }
            }}
            disabled={!isValid}
          >
            Upload Files
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },

  statsContainer: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    marginVertical: 2,
  },
  filesList: {
    flex: 1,
    marginVertical: 8,
  },

  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
  },
  fileMimeType: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
