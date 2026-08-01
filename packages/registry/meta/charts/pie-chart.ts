// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const pieChartMeta: ComponentMeta = {
  name: 'pie-chart',
  usage: {
    import: "import { PieChart } from '@/components/charts/pie-chart';",
    snippet:
      "const data = [\n  { label: 'Sales', value: 120 },\n  { label: 'Marketing', value: 98 },\n  { label: 'Support', value: 86 },\n  { label: 'Development', value: 140 },\n];\n\n<PieChart\n  data={data}\n  config={{\n    height: 200,\n    showLabels: true,\n    animated: true,\n  }}\n/>;",
  },
  types: [
    {
      name: 'PieChart',
      description:
        'A customizable pie chart component with smooth animations and flexible styling. Perfect for displaying proportional data with emphasis on parts of a whole.',
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
          description: 'The label for the data point.',
        },
        {
          name: 'value',
          type: 'number',
          description: 'The value for the data point.',
        },
        {
          name: 'color',
          type: 'string',
          description: 'Optional custom color for the slice.',
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
          name: 'showLabels',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show percentage labels on slices.',
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
          default: '`1000`',
          description: 'Animation duration in milliseconds.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The PieChart component includes several accessibility features:',
    items: [
      'Semantic SVG structure for screen readers',
      'Proper contrast ratios for visual elements',
      'Text labels for both percentages and categories',
      'Legend with colors and values',
      'Keyboard navigation support',
    ],
  },
};
