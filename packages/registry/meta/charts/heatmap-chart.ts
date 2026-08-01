// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const heatmapChartMeta: ComponentMeta = {
  name: 'heatmap-chart',
  usage: {
    import: "import { HeatmapChart } from '@/components/charts/heatmap-chart';",
    snippet:
      "const data = [\n  { row: 'Mon', col: 'Morning', value: 45 },\n  { row: 'Mon', col: 'Afternoon', value: 62 },\n  { row: 'Mon', col: 'Evening', value: 38 },\n  { row: 'Tue', col: 'Morning', value: 52 },\n  { row: 'Tue', col: 'Afternoon', value: 71 },\n  { row: 'Tue', col: 'Evening', value: 43 },\n];\n\n<HeatmapChart\n  data={data}\n  config={{\n    height: 300,\n    showLabels: true,\n    animated: true,\n    colorScale: ['#e0f2fe', '#0369a1', '#1e3a8a'],\n  }}\n/>;",
  },
  types: [
    {
      name: 'HeatmapChart',
      description:
        'A customizable heatmap chart component with smooth animations and flexible color scaling. Perfect for visualizing matrix data, correlation matrices, activity patterns, and any two-dimensional data with intensity values.',
      props: [
        {
          name: 'data',
          type: 'HeatmapDataPoint[]',
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
      name: 'HeatmapDataPoint',
      props: [
        {
          name: 'row',
          type: 'string | number',
          description: 'The row identifier for the data point.',
        },
        {
          name: 'col',
          type: 'string | number',
          description: 'The column identifier for the data point.',
        },
        {
          name: 'value',
          type: 'number',
          description: 'The intensity value for the data point.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional custom label for the data point.',
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
          description: 'Whether to show labels for cells and axes.',
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
          name: 'colorScale',
          type: 'string[]',
          default: "`['#e0f2fe', '#0369a1', '#1e3a8a']`",
          description: 'Array of hex colors for the gradient scale.',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      'The HeatmapChart component includes several accessibility features:',
    items: [
      '**Semantic Structure**: Proper SVG structure for screen readers',
      '**Value Labels**: Numeric values displayed within cells',
      '**High Contrast**: Automatic text color adjustment for readability',
      '**Descriptive Labels**: Row and column labels provide context',
      '**Keyboard Navigation**: Supports focus management',
    ],
  },
};
