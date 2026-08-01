// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const colorsMeta: ComponentMeta = {
  name: 'colors',
  usage: {
    import:
      "import { Colors, withOpacity, semanticColors } from '@/theme/colors';",
    snippet:
      "export function ThemedComponent() {\n  const colorScheme = useColorScheme();\n  const colors = Colors[colorScheme ?? 'light'];\n\n  return (\n    <View style={{ backgroundColor: colors.background }}>\n      <Text style={{ color: colors.text }}>Hello World</Text>\n    </View>\n  );\n}",
  },
};
