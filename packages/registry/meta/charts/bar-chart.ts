// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const barChartMeta: ComponentMeta = {
  name: 'bar-chart',
  usage: {
    import: "import { BarChart } from '@/components/charts/bar-chart';",
    snippet:
      "const data = [\n  { label: 'Jan', value: 100, color: '#3b82f6' },\n  { label: 'Feb', value: 120, color: '#ef4444' },\n  { label: 'Mar', value: 90, color: '#10b981' },\n  { label: 'Apr', value: 140, color: '#f59e0b' },\n];\n\n<BarChart\n  data={data}\n  config={{\n    height: 200,\n    showLabels: true,\n    animated: true,\n  }}\n/>;",
  },
  types: [
    {
      name: 'BarChart',
      description:
        'A customizable bar chart component with smooth animations and rounded corners.',
      props: [
        {
          name: 'data',
          type: 'ChartDataPoint[]',
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
      name: 'ChartDataPoint',
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'The label for the bar.',
        },
        {
          name: 'value',
          type: 'number',
          description: 'The value of the bar.',
        },
        {
          name: 'color',
          type: 'string',
          description: 'Optional custom color for the bar.',
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
          default: '`false`',
          description: 'Whether to show grid lines.',
        },
        {
          name: 'showLabels',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show labels on bars.',
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
    summary: 'The BarChart component is built with accessibility in mind:',
    items: [
      'Semantic SVG structure for screen readers',
      'Proper contrast ratios for visual elements',
      'Touch targets meet minimum size requirements',
      'Supports dynamic text sizing',
      'Clear visual hierarchy with labels and values',
    ],
  },
};
