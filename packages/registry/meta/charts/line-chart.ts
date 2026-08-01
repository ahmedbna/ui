// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const lineChartMeta: ComponentMeta = {
  name: 'line-chart',
  usage: {
    import: "import { LineChart } from '@/components/charts/line-chart';",
    snippet:
      "const data = [\n  { x: 'Jan', y: 100, label: 'January' },\n  { x: 'Feb', y: 120, label: 'February' },\n  { x: 'Mar', y: 90, label: 'March' },\n  { x: 'Apr', y: 140, label: 'April' },\n];\n\n<LineChart\n  data={data}\n  config={{\n    height: 200,\n    showGrid: true,\n    showLabels: true,\n    animated: true,\n  }}\n/>;",
  },
  types: [
    {
      name: 'LineChart',
      description:
        'A customizable line chart component with smooth animations and interactive features.',
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
          name: 'x',
          type: 'string | number',
          description: 'The x-axis value for the data point.',
        },
        {
          name: 'y',
          type: 'number',
          description: 'The y-axis value for the data point.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label for the data point.',
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
          description: 'Whether to show x-axis labels.',
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
        {
          name: 'gradient',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to show gradient fill under the line.',
        },
        {
          name: 'interactive',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to enable touch interactions.',
        },
        {
          name: 'showYLabels',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show y-axis labels.',
        },
        {
          name: 'yLabelCount',
          type: 'number',
          default: '`5`',
          description: 'Number of y-axis labels to display.',
        },
        {
          name: 'yAxisWidth',
          type: 'number',
          default: '`20`',
          description: 'Width allocated for y-axis labels.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The LineChart component is built with accessibility in mind:',
    items: [
      'Semantic SVG structure for screen readers',
      'Proper contrast ratios for visual elements',
      'Touch targets meet minimum size requirements',
      'Supports dynamic text sizing',
      'Keyboard navigation support (when interactive)',
    ],
  },
};
