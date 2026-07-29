// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const cameraMeta: ComponentMeta = {
  "name": "camera",
  "usage": {
    "import": "import { Camera } from '@/components/ui/camera';",
    "snippet": "<Camera\n  onCapture={({ uri, type }) => {\n    console.log('Captured:', uri, type);\n  }}\n  onVideoCapture={({ uri, type }) => {\n    console.log('Video captured:', uri, type);\n  }}\n  onClose={() => {\n    // Handle camera close\n  }}\n/>"
  },
  "accessibility": {
    "summary": "The Camera component includes accessibility features:",
    "items": [
      "**Screen Reader Support**: All controls have appropriate labels",
      "**High Contrast**: Clear visual distinction between active/inactive states",
      "**Touch Targets**: All interactive elements meet minimum size requirements",
      "**Keyboard Navigation**: Focus management for external keyboard users",
      "**Reduced Motion**: Respects system animation preferences"
    ]
  }
};
