import { FilePicker } from '@/components/ui/file-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function FilePickerStyled() {
  return (
    <View style={{ gap: 16 }}>
      {/* Primary Style */}
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '500' }}>
          Primary Style
        </Text>

        <FilePicker
          variant='ghost'
          onFilesSelected={(files) => console.log('Primary files:', files)}
          onError={(error) => console.error('Error:', error)}
          fileType='all'
          multiple={true}
          maxFiles={3}
          placeholder='Upload files'
          style={{
            borderWidth: 2,
            borderColor: '#007AFF',
            borderRadius: 12,
            // backgroundColor: '#f0f8ff',
          }}
        />
      </View>

      {/* Minimal Style */}
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '500' }}>
          Minimal Style
        </Text>
        <FilePicker
          variant='ghost'
          onFilesSelected={(files) => console.log('Minimal files:', files)}
          onError={(error) => console.error('Error:', error)}
          fileType='image'
          multiple={false}
          maxFiles={1}
          placeholder='Choose image'
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#ccc',
            borderRadius: 8,
            backgroundColor: 'transparent',
          }}
        />
      </View>

      {/* Success Style */}
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '500' }}>
          Success Style
        </Text>
        <FilePicker
          variant='ghost'
          onFilesSelected={(files) => console.log('Success files:', files)}
          onError={(error) => console.error('Error:', error)}
          fileType='document'
          multiple={true}
          maxFiles={5}
          placeholder='Select documents'
          style={{
            borderWidth: 2,
            borderColor: '#34C759',
            borderRadius: 16,
            // backgroundColor: '#f0fff4',
          }}
        />
      </View>
    </View>
  );
}
