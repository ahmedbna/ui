// Example usage file: app/(tabs)/file-picker-demo.tsx
import { Button } from '@/components/ui/button';
import { FilePicker, SelectedFile } from '@/components/ui/file-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import React, { useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

export function FilePickerDemo() {
  const [imageFiles, setImageFiles] = useState<SelectedFile[]>([]);
  const [documentFiles, setDocumentFiles] = useState<SelectedFile[]>([]);
  const [allFiles, setAllFiles] = useState<SelectedFile[]>([]);

  const imagePickerRef = useRef<any>(null);
  const documentPickerRef = useRef<any>(null);
  const allFilesPickerRef = useRef<any>(null);

  const backgroundColor = useColor('background');
  const textColor = useColor('text');

  const handleError = (error: string) => {
    Alert.alert('File Picker Error', error);
  };

  const handleImageFiles = (files: SelectedFile[]) => {
    setImageFiles(files);
    console.log('Image files selected:', files);
  };

  const handleDocumentFiles = (files: SelectedFile[]) => {
    setDocumentFiles(files);
    console.log('Document files selected:', files);
  };

  const handleAllFiles = (files: SelectedFile[]) => {
    setAllFiles(files);
    console.log('All files selected:', files);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>File Picker Demo</Text>

      {/* Image Picker Example */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Image Picker (Multiple)
        </Text>
        <Text style={[styles.description, { color: textColor }]}>
          Select multiple images from camera or photo library
        </Text>
        <FilePicker
          ref={imagePickerRef}
          fileType='image'
          multiple={true}
          maxFiles={5}
          maxSizeBytes={5 * 1024 * 1024} // 5MB
          onFilesSelected={handleImageFiles}
          onError={handleError}
          placeholder='Select images'
          showPreview={true}
          showFileInfo={true}
        />
        <Button
          variant='outline'
          onPress={() => imagePickerRef.current?.clearFiles()}
          style={styles.clearButton}
        >
          Clear Images
        </Button>
      </View>

      {/* Document Picker Example */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Document Picker (Single)
        </Text>
        <Text style={[styles.description, { color: textColor }]}>
          Select a single PDF document
        </Text>
        <FilePicker
          ref={documentPickerRef}
          fileType='document'
          multiple={false}
          maxSizeBytes={10 * 1024 * 1024} // 10MB
          allowedExtensions={['pdf', 'doc', 'docx', 'txt']}
          onFilesSelected={handleDocumentFiles}
          onError={handleError}
          placeholder='Select document'
          showPreview={true}
          showFileInfo={true}
        />
        <Button
          variant='outline'
          onPress={() => documentPickerRef.current?.clearFiles()}
          style={styles.clearButton}
        >
          Clear Documents
        </Button>
      </View>

      {/* All Files Picker Example */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          All Files Picker (Custom)
        </Text>
        <Text style={[styles.description, { color: textColor }]}>
          Select any file type with custom validation
        </Text>
        <FilePicker
          ref={allFilesPickerRef}
          fileType='all'
          multiple={true}
          maxFiles={3}
          maxSizeBytes={2 * 1024 * 1024} // 2MB
          allowedExtensions={['jpg', 'png', 'pdf', 'txt', 'json']}
          onFilesSelected={handleAllFiles}
          onError={handleError}
          placeholder='Select any files'
          showPreview={true}
          showFileInfo={true}
          accessibilityLabel='Select files'
          accessibilityHint='Opens file picker to select various file types'
        />
        <Button
          variant='outline'
          onPress={() => allFilesPickerRef.current?.clearFiles()}
          style={styles.clearButton}
        >
          Clear All Files
        </Button>
      </View>

      {/* Programmatic Control Example */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Programmatic Control
        </Text>
        <View style={styles.buttonRow}>
          <Button
            variant='secondary'
            onPress={() => imagePickerRef.current?.openPicker()}
            style={styles.programmaticButton}
          >
            Open Image Picker
          </Button>
          <Button
            variant='secondary'
            onPress={() => documentPickerRef.current?.openPicker()}
            style={styles.programmaticButton}
          >
            Open Doc Picker
          </Button>
        </View>
      </View>

      {/* File Summary */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Selected Files Summary
        </Text>
        <Text style={[styles.summary, { color: textColor }]}>
          Images: {imageFiles.length}
        </Text>
        <Text style={[styles.summary, { color: textColor }]}>
          Documents: {documentFiles.length}
        </Text>
        <Text style={[styles.summary, { color: textColor }]}>
          All Files: {allFiles.length}
        </Text>
        <Text style={[styles.summary, { color: textColor }]}>
          Total: {imageFiles.length + documentFiles.length + allFiles.length}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
    opacity: 0.7,
  },
  clearButton: {
    marginTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  programmaticButton: {
    flex: 1,
  },
  summary: {
    fontSize: 16,
    marginBottom: 4,
  },
});

// Advanced usage with form integration
export function FilePickerForm() {
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (files.length === 0) {
      Alert.alert('Error', 'Please select at least one file');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate file upload
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file_${index}`, {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream',
        } as any);
      });

      // Your upload logic here
      console.log('Uploading files:', files);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert('Success', 'Files uploaded successfully!');
      setFiles([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload files');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>File Upload Form</Text>

      <FilePicker
        fileType='all'
        multiple={true}
        maxFiles={5}
        maxSizeBytes={10 * 1024 * 1024}
        onFilesSelected={setFiles}
        onError={(error) => Alert.alert('Error', error)}
        placeholder='Select files to upload'
        disabled={isSubmitting}
      />

      <Button
        onPress={handleSubmit}
        loading={isSubmitting}
        disabled={files.length === 0}
        style={{ marginTop: 20 }}
      >
        {isSubmitting ? 'Uploading...' : `Upload ${files.length} files`}
      </Button>
    </View>
  );
}
