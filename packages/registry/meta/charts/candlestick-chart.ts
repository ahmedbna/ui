// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const candlestickChartMeta: ComponentMeta = {
  name: 'candlestick-chart',
  usage: {
    import:
      "import { CandlestickChart } from '@/components/charts/candlestick-chart';",
    snippet:
      "const data = [\n  { date: 'Jan 1', open: 100, high: 120, low: 95, close: 110 },\n  { date: 'Jan 2', open: 110, high: 125, low: 105, close: 115 },\n  { date: 'Jan 3', open: 115, high: 130, low: 110, close: 125 },\n  { date: 'Jan 4', open: 125, high: 140, low: 120, close: 135 },\n];\n\n<CandlestickChart\n  data={data}\n  config={{\n    height: 200,\n    showGrid: true,\n    showLabels: true,\n    animated: true,\n  }}\n/>;",
  },
  types: [
    {
      name: 'CandlestickChart',
      description:
        'A customizable candlestick chart component for financial data visualization with smooth animations.',
      props: [
        {
          name: 'data',
          type: 'CandlestickDataPoint[]',
          description: 'Array of candlestick data points to display.',
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
      name: 'CandlestickDataPoint',
      props: [
        {
          name: 'date',
          type: 'string',
          description: 'The date/time label for the candle.',
        },
        {
          name: 'open',
          type: 'number',
          description: 'The opening price for the period.',
        },
        {
          name: 'high',
          type: 'number',
          description: 'The highest price for the period.',
        },
        {
          name: 'low',
          type: 'number',
          description: 'The lowest price for the period.',
        },
        {
          name: 'close',
          type: 'number',
          description: 'The closing price for the period.',
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
          description: 'Whether to show date labels.',
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
      'The CandlestickChart component is built with accessibility in mind:',
    items: [
      'The chart\'s outer container exposes accessibilityRole="image" with a synthesized summary label (candle count and value range)',
    ],
  },
};
