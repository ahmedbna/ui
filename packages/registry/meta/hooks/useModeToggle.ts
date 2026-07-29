// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const useModeToggleMeta: ComponentMeta = {
  "name": "useModeToggle",
  "usage": {
    "import": "import { useModeToggle } from '@/hooks/useModeToggle';",
    "snippet": "export function ThemeToggle() {\n  const { isDark, mode, setMode, toggleMode } = useModeToggle();\n\n  return (\n    <View>\n      <Text>Current mode: {mode}</Text>\n      <Text>Is dark: {isDark ? 'Yes' : 'No'}</Text>\n      <TouchableOpacity onPress={toggleMode}>\n        <Text>Toggle Theme</Text>\n      </TouchableOpacity>\n    </View>\n  );\n}"
  },
  "accessibility": {
    "summary": "The hook supports accessibility by:",
    "items": [
      "Providing programmatic access to theme state for screen readers",
      "Enabling proper contrast ratios through theme mode control",
      "Supporting system-level accessibility preferences in system mode",
      "Allowing users to override system preferences when needed"
    ]
  }
};
