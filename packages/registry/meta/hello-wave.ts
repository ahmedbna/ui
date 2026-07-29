// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const helloWaveMeta: ComponentMeta = {
  "name": "hello-wave",
  "types": [
    {
      "name": "HelloWave",
      "description": "An animated component that displays a waving hand emoji with rotation animation and customizable sizes.",
      "props": [
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "default": "`'md'`",
          "description": "Controls the size of the emoji and animation scale."
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "default": "`'👋'`",
          "description": "Content to animate - typically an emoji string."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The HelloWave component:",
    "items": [
      "Uses semantic emoji that screen readers can interpret",
      "Maintains proper text sizing for accessibility",
      "Works with system accessibility settings",
      "Animation doesn't interfere with screen reader functionality",
      "Proper font sizing scales with system text size preferences"
    ]
  }
};
