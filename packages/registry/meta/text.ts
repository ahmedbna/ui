// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const textMeta: ComponentMeta = {
  "name": "text",
  "usage": {
    "import": "import { Text } from '@/components/ui/text';",
    "snippet": "<Text variant=\"body\">This is body text</Text>\n<Text variant=\"heading\">This is a heading</Text>\n<Text variant=\"caption\">This is caption text</Text>"
  },
  "types": [
    {
      "name": "Text",
      "description": "A flexible text component that supports multiple variants and theming.",
      "props": [
        {
          "name": "variant",
          "type": "'body' | 'title' | 'subtitle' | 'caption' | 'heading' | 'link'",
          "default": "`'body'`",
          "description": "The text variant that determines styling."
        },
        {
          "name": "lightColor",
          "type": "string",
          "description": "Custom color for light theme."
        },
        {
          "name": "darkColor",
          "type": "string",
          "description": "Custom color for dark theme."
        },
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The text content to display."
        },
        {
          "name": "style",
          "type": "TextStyle",
          "description": "Additional styles to apply to the text."
        },
        {
          "name": "...props",
          "type": "TextProps",
          "description": "All other React Native Text props are supported."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Text component is built with accessibility in mind:",
    "items": [
      "Inherits all React Native Text accessibility features",
      "Supports dynamic text sizing for users with vision impairments",
      "Maintains proper contrast ratios with theme colors",
      "Works with screen readers and other assistive technologies",
      "Supports semantic roles via standard React Native Text props"
    ]
  }
};
