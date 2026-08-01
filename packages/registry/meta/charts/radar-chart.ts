// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const radarChartMeta: ComponentMeta = {
  name: 'radar-chart',
  usage: {
    import: "import { RadarChart } from '@/components/charts/radar-chart';",
    snippet:
      "const data = [\n  { label: 'Speed', value: 80 },\n  { label: 'Reliability', value: 92 },\n  { label: 'Comfort', value: 75 },\n  { label: 'Safety', value: 88 },\n  { label: 'Efficiency', value: 85 },\n];\n\n<RadarChart\n  data={data}\n  config={{\n    height: 300,\n    showLabels: true,\n    animated: true,\n  }}\n/>;",
  },
  types: [
    {
      name: 'RadarChart',
      description:
        'A customizable radar chart component with smooth animations and flexible styling. Perfect for displaying multi-dimensional data with emphasis on comparison across multiple metrics.',
      props: [
        {
          name: 'data',
          type: 'RadarChartDataPoint[]',
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
      name: 'RadarChartDataPoint',
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
          description: 'Whether to show labels around the chart.',
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
          name: 'maxValue',
          type: 'number',
          description: 'Maximum value for the chart scale (auto if omitted).',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      'The RadarChart component includes several accessibility features:',
    items: [
      'Semantic SVG structure for screen readers',
      'Proper contrast ratios for visual elements',
      'Text labels for all data points',
      'Supports dynamic text sizing',
      'Clear visual hierarchy with grid lines',
    ],
  },
};
