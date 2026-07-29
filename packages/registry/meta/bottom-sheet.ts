// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const bottomSheetMeta: ComponentMeta = {
  "name": "bottom-sheet",
  "usage": {
    "import": "import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';",
    "snippet": "function MyComponent() {\n  const { isVisible, open, close } = useBottomSheet();\n\n  return (\n    <>\n      <Button onPress={open}>Open Bottom Sheet</Button>\n\n      <BottomSheet\n        isVisible={isVisible}\n        onClose={close}\n        title='Settings'\n        snapPoints={[0.3, 0.6, 0.9]}\n      >\n        <Text>Your content here</Text>\n      </BottomSheet>\n    </>\n  );\n}"
  },
  "accessibility": {
    "summary": "The BottomSheet component includes accessibility features:",
    "items": [
      "**Modal Semantics**: Proper modal behavior for screen readers",
      "**Focus Management**: Traps focus within the sheet when open",
      "**Gesture Alternatives**: Provides non-gesture ways to interact",
      "**Backdrop Dismiss**: Can be disabled for better accessibility control"
    ]
  }
};
