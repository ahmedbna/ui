// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const collapsibleMeta: ComponentMeta = {
  name: 'collapsible',
  usage: {
    import: "import { Collapsible } from '@/components/ui/collapsible';",
    snippet:
      "<Collapsible title='What is React Native?'>\n  <Text>\n    React Native is an open-source UI software framework created by Meta. It is\n    used to develop applications for multiple platforms.\n  </Text>\n</Collapsible>",
  },
  types: [
    {
      name: 'Collapsible',
      description:
        'An expandable/collapsible container component that shows or hides its content.',
      props: [
        {
          name: 'haptic',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether to trigger haptic feedback when the content expands or collapses.',
        },
        {
          name: 'title',
          type: 'string',
          description: 'The title text displayed in the header.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The content to show/hide when toggled.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Collapsible component is built with accessibility in mind:',
    items: [
      'Uses TouchableOpacity for proper touch handling',
      'Visual indicator (chevron) shows current state',
      'Proper spacing and indentation for content hierarchy',
      'Supports nested content and interactive elements',
      'Clear visual feedback with activeOpacity on touch',
    ],
  },
};
