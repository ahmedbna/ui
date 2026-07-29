// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const stackedAreaChartMeta: ComponentMeta = {
  "name": "stacked-area-chart",
  "usage": {
    "import": "import { StackedAreaChart } from '@/components/charts/stacked-area-chart';",
    "snippet": "const data = [\n  { x: 1, y: [20, 30, 40], label: 'Jan' },\n  { x: 2, y: [25, 35, 45], label: 'Feb' },\n  { x: 3, y: [30, 40, 50], label: 'Mar' },\n  { x: 4, y: [35, 45, 55], label: 'Apr' },\n];\n\nconst categories = ['Series 1', 'Series 2', 'Series 3'];\n\n<StackedAreaChart\n  data={data}\n  categories={categories}\n  config={{\n    height: 300,\n    showLabels: true,\n    animated: true,\n  }}\n/>;"
  },
  "types": [
    {
      "name": "StackedAreaChart",
      "description": "A customizable stacked area chart component with smooth animations and gradient fills. Perfect for displaying multiple data series over time or categories, showing both individual values and cumulative totals.",
      "props": [
        {
          "name": "data",
          "type": "StackedAreaDataPoint[]",
          "description": "Array of data points to display on the chart."
        },
        {
          "name": "colors",
          "type": "string[]",
          "default": "`[]`",
          "description": "Array of colors for each data series."
        },
        {
          "name": "config",
          "type": "ChartConfig",
          "default": "`{}`",
          "description": "Configuration object for chart appearance."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the chart."
        },
        {
          "name": "categories",
          "type": "string[]",
          "default": "`[]`",
          "description": "Array of category names for the legend."
        }
      ]
    },
    {
      "name": "StackedAreaDataPoint",
      "props": [
        {
          "name": "x",
          "type": "number",
          "description": "The x-axis value for the data point."
        },
        {
          "name": "y",
          "type": "number[]",
          "description": "Array of y-values for each series at this x."
        },
        {
          "name": "label",
          "type": "string",
          "description": "Optional label for the data point."
        }
      ]
    },
    {
      "name": "ChartConfig",
      "props": [
        {
          "name": "width",
          "type": "number",
          "description": "Fixed width of the chart (auto-sizes if omitted)."
        },
        {
          "name": "height",
          "type": "number",
          "default": "`200`",
          "description": "Height of the chart."
        },
        {
          "name": "padding",
          "type": "number",
          "default": "`20`",
          "description": "Padding around the chart."
        },
        {
          "name": "showGrid",
          "type": "boolean",
          "default": "`true`",
          "description": "Whether to show grid lines."
        },
        {
          "name": "showLabels",
          "type": "boolean",
          "default": "`true`",
          "description": "Whether to show labels for data points."
        },
        {
          "name": "animated",
          "type": "boolean",
          "default": "`true`",
          "description": "Whether to animate the chart on load."
        },
        {
          "name": "duration",
          "type": "number",
          "default": "`1000`",
          "description": "Animation duration in milliseconds."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The StackedAreaChart component includes several accessibility features:",
    "items": [
      "Semantic SVG structure for screen readers",
      "Proper contrast ratios for visual elements",
      "Text labels for data points and categories",
      "Legend with clear category identification",
      "Grid lines for better value estimation"
    ]
  }
};
