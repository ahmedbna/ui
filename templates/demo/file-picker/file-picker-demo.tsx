import { FilePicker } from '@/components/ui/file-picker';
import React from 'react';

export function FilePickerDemo() {
  return (
    <FilePicker
      onFilesSelected={(files) => console.log('Selected files:', files)}
      onError={(error) => console.error('Error:', error)}
      fileType='all'
      multiple={true}
      maxFiles={5}
      placeholder='Select your files'
      showFileInfo={true}
    />
  );
}
