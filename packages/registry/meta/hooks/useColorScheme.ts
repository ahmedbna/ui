// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const useColorSchemeMeta: ComponentMeta = {
  name: 'useColorScheme',
  usage: {
    import: "import { useColorScheme } from '@/hooks/useColorScheme';",
    snippet:
      "export function ThemedComponent() {\n  const colorScheme = useColorScheme();\n\n  return (\n    <View\n      style={{\n        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',\n      }}\n    >\n      {/* Your themed content */}\n    </View>\n  );\n}",
  },
  accessibility: {
    summary: 'The hook helps maintain proper accessibility by:',
    items: [
      "Respecting user's system-level accessibility preferences",
      'Supporting high contrast modes automatically',
      'Enabling proper color contrast ratios for different themes',
      'Ensuring consistent theming across the application',
    ],
  },
};
