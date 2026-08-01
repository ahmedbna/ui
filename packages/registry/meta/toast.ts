// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const toastMeta: ComponentMeta = {
  name: 'toast',
  usage: {
    import: "import { useToast } from '@/components/ui/toast';",
    snippet:
      "function MyComponent() {\n  const { toast } = useToast();\n\n  const showToast = () => {\n    toast({\n      title: 'Success!',\n      description: 'Your changes have been saved.',\n      variant: 'success',\n    });\n  };\n\n  return <Button onPress={showToast}>Show Toast</Button>;\n}",
  },
  accessibility: {
    summary: 'The Toast component is built with accessibility in mind:',
    items: [
      'Proper color contrast for all variants',
      'Clear visual hierarchy with title and description',
      'Icon indicators for different toast types',
      'Dismissible with both gesture and button interactions',
      'Supports dynamic text sizing',
      'Screen reader friendly content structure',
    ],
  },
};
