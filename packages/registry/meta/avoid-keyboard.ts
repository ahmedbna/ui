// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const avoidKeyboardMeta: ComponentMeta = {
  "name": "avoid-keyboard",
  "usage": {
    "import": "import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';",
    "snippet": "<View style={{ flex: 1 }}>\n  {/* Your content */}\n  <TextInput placeholder='Type here...' />\n\n  {/* This will push content up when keyboard appears */}\n  <AvoidKeyboard />\n</View>"
  },
  "types": [
    {
      "name": "AvoidKeyboard",
      "description": "Automatically adjusts height to avoid keyboard overlap with smooth animations.",
      "props": [
        {
          "name": "offset",
          "type": "number",
          "default": "`0`",
          "description": "Additional spacing above the keyboard (in px)"
        },
        {
          "name": "duration",
          "type": "number",
          "default": "`0`",
          "description": "Extra animation duration (in ms)"
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The AvoidKeyboard component enhances accessibility by:",
    "items": [
      "**Preventing content hiding**: Ensures form inputs remain visible",
      "**Maintaining focus**: Keeps focused elements in view",
      "**Supporting assistive tech**: Works with screen readers and voice control",
      "**Respecting user settings**: Honors system animation preferences"
    ]
  }
};
