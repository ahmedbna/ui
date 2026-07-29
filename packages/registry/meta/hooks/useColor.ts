// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const useColorMeta: ComponentMeta = {
  "name": "useColor",
  "usage": {
    "import": "import { useColor } from '@/hooks/useColor';",
    "snippet": "export function ThemedText({ style, ...props }) {\n  const color = useColor('text', { light: '#000', dark: '#fff' });\n\n  return <Text style={[{ color }, style]} {...props} />;\n}"
  },
  "accessibility": {
    "summary": "The hook supports accessibility by:",
    "items": [
      "Respecting system-level dark mode preferences",
      "Enabling proper color contrast ratios through theme definitions",
      "Supporting high contrast modes when defined in your color palette",
      "Maintaining consistent color relationships across themes"
    ]
  }
};
