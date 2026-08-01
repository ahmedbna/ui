// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const stackedBarChartMeta: ComponentMeta = {
  name: 'stacked-bar-chart',
  usage: {
    import:
      "import { StackedBarChart } from '@/components/charts/stacked-bar-chart';",
    snippet:
      "const data = [\n  { label: 'Q1', values: [120, 98, 86] },\n  { label: 'Q2', values: [140, 110, 95] },\n  { label: 'Q3', values: [160, 130, 105] },\n  { label: 'Q4', values: [180, 150, 115] },\n];\n\nconst categories = ['Sales', 'Marketing', 'Support'];\n\n<StackedBarChart\n  data={data}\n  categories={categories}\n  config={{\n    height: 300,\n    showLabels: true,\n    animated: true,\n  }}\n/>;",
  },
  types: [
    {
      name: 'StackedBarChart',
      description:
        'A customizable stacked bar chart component with smooth animations and flexible styling. Perfect for displaying multiple data series stacked on top of each other, supporting both vertical and horizontal orientations.',
      props: [
        {
          name: 'data',
          type: 'StackedBarDataPoint[]',
          description: 'Array of data points to display on the chart.',
        },
        {
          name: 'categories',
          type: 'string[]',
          default: '`[]`',
          description: 'Array of category names for the legend.',
        },
        {
          name: 'colors',
          type: 'string[]',
          default: '`[]`',
          description: 'Custom colors for each data series.',
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
          name: 'horizontal',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to display bars horizontally.',
        },
      ],
    },
    {
      name: 'StackedBarDataPoint',
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'The label for the data point.',
        },
        {
          name: 'values',
          type: 'number[]',
          description: 'Array of values for each stack in the bar.',
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
          name: 'showLabels',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show labels for bars.',
        },
        {
          name: 'showGrid',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show grid lines.',
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
    summary:
      'The StackedBarChart component includes several accessibility features:',
    items: [
      'Semantic SVG structure for screen readers',
      'Proper contrast ratios for visual elements',
      'Text labels for both categories and values',
      'Legend support for data series identification',
      'Supports dynamic text sizing',
      'Keyboard navigation support',
    ],
  },
};
