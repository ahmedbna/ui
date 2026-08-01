// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const useBottomTabOverflowMeta: ComponentMeta = {
  name: 'useBottomTabOverflow',
  usage: {
    import:
      "import { useBottomTabOverflow } from '@/hooks/useBottomTabOverflow';",
    snippet:
      'export function MyScreen() {\n  const tabOverflow = useBottomTabOverflow();\n\n  return (\n    <View style={{ paddingBottom: tabOverflow }}>{/* Your content */}</View>\n  );\n}',
  },
  accessibility: {
    summary: 'The hook helps maintain proper accessibility by:',
    items: [
      'Ensuring content is not hidden behind navigation elements',
      'Maintaining proper touch targets for interactive elements',
      'Supporting screen readers by keeping content visible and accessible',
    ],
  },
};
