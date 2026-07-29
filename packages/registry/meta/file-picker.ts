// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const filePickerMeta: ComponentMeta = {
  "name": "file-picker",
  "usage": {
    "import": "import { FilePicker } from '@/components/ui/file-picker';",
    "snippet": "<FilePicker\n  onFilesSelected={(files) => console.log('Selected files:', files)}\n  onError={(error) => console.error('Error:', error)}\n  fileType='all'\n  multiple={true}\n  maxFiles={5}\n  placeholder='Select your files'\n/>"
  },
  "accessibility": {
    "summary": "The FilePicker component is built with accessibility in mind:",
    "items": [
      "Proper accessibility labels and hints",
      "Screen reader support for file information",
      "Keyboard navigation support",
      "Clear error messaging",
      "Semantic button structure"
    ]
  }
};
