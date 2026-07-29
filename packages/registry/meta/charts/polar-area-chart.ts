// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const polarAreaChartMeta: ComponentMeta = {
  "name": "polar-area-chart",
  "usage": {
    "import": "import { PolarAreaChart } from '@/components/charts/polar-area-chart';",
    "snippet": "const data = [\n  { label: 'Sales', value: 120 },\n  { label: 'Marketing', value: 98 },\n  { label: 'Support', value: 86 },\n  { label: 'Development', value: 140 },\n  { label: 'Design', value: 75 },\n];\n\n<PolarAreaChart\n  data={data}\n  config={{\n    height: 300,\n    showLabels: true,\n    animated: true,\n  }}\n/>;"
  },
  "types": [
    {
      "name": "PolarAreaChart",
      "description": "A customizable polar area chart component with smooth animations and flexible styling. Perfect for displaying multivariate data in a radial format, where each segment represents a different category with varying magnitudes.",
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
          "name": "label",
          "type": "string",
          "description": "The label for the data point."
        },
        {
          "name": "value",
          "type": "number",
          "description": "The value for the data point."
        },
        {
          "name": "color",
          "type": "string",
          "description": "Optional custom color for the segment."
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
          "name": "showLabels",
          "type": "boolean",
          "default": "`true`",
          "description": "Whether to show value labels on segments."
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
    "summary": "The PolarAreaChart component includes several accessibility features:",
    "items": [
      "Semantic SVG structure for screen readers",
      "High contrast white text on colored segments",
      "Descriptive legend with clear labels and values",
      "Proper color contrast ratios",
      "Text labels for both categories and values",
      "Supports dynamic text sizing"
    ]
  }
};
