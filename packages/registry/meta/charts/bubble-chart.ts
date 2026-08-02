// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const bubbleChartMeta: ComponentMeta = {
  name: 'bubble-chart',
  usage: {
    import: "import { BubbleChart } from '@/components/charts/bubble-chart';",
    snippet:
      "const data = [\n  { x: 10, y: 20, size: 15, label: 'A', color: '#FF6B6B' },\n  { x: 25, y: 30, size: 25, label: 'B', color: '#4ECDC4' },\n  { x: 40, y: 15, size: 30, label: 'C', color: '#45B7D1' },\n  { x: 35, y: 45, size: 20, label: 'D', color: '#96CEB4' },\n];\n\n<BubbleChart\n  data={data}\n  config={{\n    height: 300,\n    showGrid: true,\n    showLabels: true,\n    animated: true,\n  }}\n/>;",
  },
  types: [
    {
      name: 'BubbleChart',
      description:
        'A customizable bubble chart component with smooth animations.',
      props: [
        {
          name: 'data',
          type: 'BubbleChartDataPoint[]',
          description: 'Array of data points to display on the chart.',
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
      ],
    },
    {
      name: 'BubbleChartDataPoint',
      props: [
        {
          name: 'x',
          type: 'number',
          description: 'The x-axis value for the data point.',
        },
        {
          name: 'y',
          type: 'number',
          description: 'The y-axis value for the data point.',
        },
        {
          name: 'size',
          type: 'number',
          description: 'The size value for the bubble.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label for the data point.',
        },
        {
          name: 'color',
          type: 'string',
          description: 'Optional color for the bubble.',
        },
      ],
    },
    {
      name: 'ChartConfig',
      props: [
        {
          name: 'width',
          type: 'number',
          description: 'Fixed width of the chart (auto-sizes if omitted).',
        },
        {
          name: 'height',
          type: 'number',
          default: '`200`',
          description: 'Height of the chart.',
        },
        {
          name: 'padding',
          type: 'number',
          default: '`20`',
          description: 'Padding around the chart.',
        },
        {
          name: 'showGrid',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show grid lines.',
        },
        {
          name: 'showLabels',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show bubble labels.',
        },
        {
          name: 'animated',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to animate the chart on load.',
        },
        {
          name: 'duration',
          type: 'number',
          default: '`800`',
          description: 'Animation duration in milliseconds.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The BubbleChart component is built with accessibility in mind:',
    items: [
      'The chart\'s outer container exposes accessibilityRole="image" with a synthesized summary label (bubble count and x/y ranges)',
    ],
  },
};
