// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const radialBarChartMeta: ComponentMeta = {
  "name": "radial-bar-chart",
  "usage": {
    "import": "import { RadialBarChart } from '@/components/charts/radial-bar-chart';",
    "snippet": "const data = [\n  { label: 'Sales', value: 120 },\n  { label: 'Marketing', value: 98 },\n  { label: 'Support', value: 86 },\n  { label: 'Development', value: 140 },\n];\n\n<RadialBarChart\n  data={data}\n  config={{\n    animated: true,\n    gradient: true,\n    duration: 1000,\n  }}\n/>;"
  },
  "types": [
    {
      "name": "RadialBarChart",
      "description": "A customizable radial bar chart component with smooth animations, gradient support, and center value display. Perfect for displaying progress, completion rates, or categorical data in a circular format.",
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
          "description": "Optional custom color for the arc."
        }
      ]
    },
    {
      "name": "ChartConfig",
      "props": [
        {
          "name": "padding",
          "type": "number",
          "default": "`20`",
          "description": "Padding around the chart."
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
        },
        {
          "name": "gradient",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether to use gradient effects for the arcs."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The RadialBarChart component includes several accessibility features:",
    "items": [
      "Semantic SVG structure for screen readers",
      "Proper contrast ratios for visual elements",
      "Text labels for both categories and values",
      "Legend with clear color indicators",
      "Supports dynamic text sizing",
      "Keyboard navigation support"
    ]
  }
};
