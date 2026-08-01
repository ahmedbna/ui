// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const progressRingChartMeta: ComponentMeta = {
  name: 'progress-ring-chart',
  usage: {
    import:
      "import { ProgressRingChart } from '@/components/charts/progress-ring-chart';",
    snippet:
      '<ProgressRingChart\n  progress={75}\n  size={120}\n  strokeWidth={8}\n  config={{\n    animated: true,\n    duration: 1000,\n    gradient: true,\n  }}\n/>',
  },
  types: [
    {
      name: 'ProgressRingChart',
      description:
        'A customizable circular progress ring component with smooth animations and flexible styling. Perfect for displaying progress, completion rates, or any percentage-based data.',
      props: [
        {
          name: 'progress',
          type: 'number',
          description: 'Progress value from 0 to 100.',
        },
        {
          name: 'size',
          type: 'number',
          default: '`120`',
          description: 'Size of the progress ring in pixels.',
        },
        {
          name: 'strokeWidth',
          type: 'number',
          default: '`8`',
          description: 'Width of the progress ring stroke.',
        },
        {
          name: 'config',
          type: 'ChartConfig',
          default: '`{}`',
          description: 'Configuration object for chart appearance.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the chart.',
        },
        {
          name: 'showLabel',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show the label above the ring.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Label text to display above the ring.',
        },
        {
          name: 'centerText',
          type: 'string',
          description: 'Custom text to display in the center.',
        },
      ],
    },
    {
      name: 'ChartConfig',
      props: [
        {
          name: 'animated',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to animate the chart on load.',
        },
        {
          name: 'duration',
          type: 'number',
          default: '`1000`',
          description: 'Animation duration in milliseconds.',
        },
        {
          name: 'gradient',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to use gradient colors for the ring.',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      'The ProgressRingChart component includes several accessibility features:',
    items: [
      'Semantic SVG structure for screen readers',
      'Proper contrast ratios for visual elements',
      'Text labels for progress values',
      'Supports dynamic text sizing',
      'Keyboard navigation support',
    ],
  },
};
