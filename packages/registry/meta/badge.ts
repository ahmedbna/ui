// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const badgeMeta: ComponentMeta = {
  name: 'badge',
  usage: {
    import: "import { Badge } from '@/components/ui/badge';",
    snippet:
      '<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="destructive">Destructive</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="success">Success</Badge>',
  },
  types: [
    {
      name: 'Badge',
      description:
        'A versatile badge component for displaying status, categories, or notifications.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The content to display inside the badge.',
        },
        {
          name: 'variant',
          type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success'",
          default: "`'default'`",
          description: 'The visual style variant of the badge.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the badge.',
        },
        {
          name: 'textStyle',
          type: 'TextStyle',
          description: 'Additional styles to apply to the badge text.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Badge component is built with accessibility in mind:',
    items: [
      'Uses semantic structure for screen readers',
      'Proper contrast ratios for all variants',
      'Supports dynamic text sizing',
      'Clear visual distinction between different states',
    ],
  },
};
