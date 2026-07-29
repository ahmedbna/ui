// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const scatterChartMeta: ComponentMeta = {
  "name": "scatter-chart",
  "usage": {
    "import": "import { ScatterPlot } from '@/components/charts/scatter-chart';",
    "snippet": "const data = [\n  { x: 10, y: 20, label: 'Point A' },\n  { x: 25, y: 35, label: 'Point B' },\n  { x: 40, y: 15, label: 'Point C' },\n  { x: 55, y: 45, label: 'Point D' },\n];\n\n<ScatterPlot\n  data={data}\n  config={{\n    height: 300,\n    showLabels: true,\n    animated: true,\n  }}\n/>;"
  },
  "types": [
    {
      "name": "ScatterPlot",
      "description": "A customizable scatter plot component with smooth animations and flexible styling. Perfect for visualizing relationships between two numerical variables and identifying patterns, trends, or outliers in data.",
      "props": [
        {
          "name": "data",
          "type": "ChartDataPoint[]",
          "description": "Array of data points to display on the chart."
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
        }
      ]
    },
    {
      "name": "ChartDataPoint",
      "props": [
        {
          "name": "x",
          "type": "number",
          "description": "The x-coordinate for the data point."
        },
        {
          "name": "y",
          "type": "number",
          "description": "The y-coordinate for the data point."
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
          "description": "Whether to show axis labels."
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
          "default": "`800`",
          "description": "Animation duration in milliseconds."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The ScatterPlot component includes several accessibility features:",
    "items": [
      "Semantic SVG structure for screen readers",
      "Proper contrast ratios for visual elements",
      "Clear axis labels with numerical values",
      "Grid lines for better data point reference",
      "Supports dynamic text sizing"
    ]
  }
};
