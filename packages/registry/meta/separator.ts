// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const separatorMeta: ComponentMeta = {
  "name": "separator",
  "usage": {
    "import": "import { Separator } from '@/components/ui/separator';",
    "snippet": "<Separator />"
  },
  "types": [
    {
      "name": "Separator",
      "description": "A component that creates visual separation between content elements.",
      "props": [
        {
          "name": "orientation",
          "type": "'horizontal' | 'vertical'",
          "default": "`'horizontal'`",
          "description": "The orientation of the separator."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the separator."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Separator component is built with accessibility in mind:",
    "items": [
      "Uses appropriate semantic structure for screen readers",
      "Provides visual separation that maintains proper contrast ratios",
      "Works well with keyboard navigation flows",
      "Respects system accessibility settings for reduced motion"
    ]
  }
};
