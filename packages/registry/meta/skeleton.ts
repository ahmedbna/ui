// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const skeletonMeta: ComponentMeta = {
  name: 'skeleton',
  usage: {
    import: "import { Skeleton } from '@/components/ui/skeleton';",
    snippet: '<Skeleton width={200} height={20} />',
  },
  types: [
    {
      name: 'Skeleton',
      description:
        'A loading placeholder component with animated pulsing effect.',
      props: [
        {
          name: 'width',
          type: 'number | string',
          default: '`100%`',
          description: 'The width of the skeleton.',
        },
        {
          name: 'height',
          type: 'number',
          default: '`100`',
          description: 'The height of the skeleton in pixels.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the skeleton.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Skeleton component is built with accessibility in mind:',
    items: [
      'Uses appropriate color contrast for loading states',
      'Provides visual feedback during content loading',
      'Maintains layout stability while content loads',
      'Compatible with screen readers through proper semantic structure',
    ],
  },
};
