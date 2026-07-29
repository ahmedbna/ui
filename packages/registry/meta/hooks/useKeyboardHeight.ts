// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const useKeyboardHeightMeta: ComponentMeta = {
  "name": "useKeyboardHeight",
  "usage": {
    "import": "import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';",
    "snippet": "export function KeyboardAwareView({ children }) {\n  const { keyboardHeight, isKeyboardVisible, keyboardAnimationDuration } =\n    useKeyboardHeight();\n\n  return (\n    <View>\n      <Text>Keyboard Height: {keyboardHeight}</Text>\n      <Text>Keyboard Visible: {isKeyboardVisible ? 'Yes' : 'No'}</Text>\n      <Text>Animation Duration: {keyboardAnimationDuration}ms</Text>\n    </View>\n  );\n}"
  },
  "accessibility": {
    "summary": "The hook supports accessibility by:",
    "items": [
      "Preserving keyboard navigation patterns",
      "Maintaining focus management during keyboard transitions",
      "Supporting screen readers by keeping content visible above keyboard",
      "Enabling proper scrolling behavior for assistive technologies"
    ]
  }
};
