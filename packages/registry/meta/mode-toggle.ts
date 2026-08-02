// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const modeToggleMeta: ComponentMeta = {
  name: 'mode-toggle',
  usage: {
    import: "import { ModeToggle } from '@/components/ui/mode-toggle';",
    snippet: '<ModeToggle />',
  },
  types: [
    {
      name: 'ModeToggle',
      description:
        'An animated button that toggles between light and dark themes. The component uses the `Button` component internally, so it inherits button styling and behavior.',
      props: [
        {
          name: 'variant',
          type: 'ButtonVariant',
          default: "`'outline'`",
          description:
            'The visual variant passed through to the underlying `Button`.',
        },
        {
          name: 'size',
          type: 'ButtonSize',
          default: "`'icon'`",
          description: 'The size passed through to the underlying `Button`.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The ModeToggle maintains accessibility:',
    items: [
      'Uses semantic button component',
      'Screen readers announce theme changes',
      'Maintains proper focus behavior',
      'Works with keyboard navigation',
      'Respects system accessibility settings',
    ],
  },
};
