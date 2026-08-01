// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const chartContainerMeta: ComponentMeta = {
  name: 'chart-container',
  usage: {
    import:
      "import { ChartContainer } from '@/components/charts/chart-container';",
    snippet:
      "<ChartContainer\n  title='Monthly Revenue'\n  description='Revenue data for the last 6 months'\n>\n  {/* Your chart component goes here */}\n</ChartContainer>",
  },
  types: [
    {
      name: 'ChartContainer',
      description:
        'A container component that provides consistent styling and layout for charts.',
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'The title displayed above the chart.',
        },
        {
          name: 'description',
          type: 'string',
          description: 'The description text displayed below the title.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The chart component to be wrapped.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the container.',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      'The ChartContainer component is built with accessibility in mind:',
    items: [
      'Uses semantic structure for screen readers',
      'Proper heading hierarchy with title and description',
      'Consistent spacing and layout',
      'Supports dynamic text sizing',
    ],
  },
};
