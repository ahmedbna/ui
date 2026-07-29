// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const modeToggleMeta: ComponentMeta = {
  "name": "mode-toggle",
  "usage": {
    "import": "import { ModeToggle } from '@/components/ui/mode-toggle';",
    "snippet": "<ModeToggle />"
  },
  "types": [
    {
      "name": "ModeToggle",
      "description": "An animated button that toggles between light and dark themes. The component uses the `Button` component internally, so it inherits button styling and behavior.",
      "props": [
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the button."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The ModeToggle maintains accessibility:",
    "items": [
      "Uses semantic button component",
      "Screen readers announce theme changes",
      "Maintains proper focus behavior",
      "Works with keyboard navigation",
      "Respects system accessibility settings"
    ]
  }
};
