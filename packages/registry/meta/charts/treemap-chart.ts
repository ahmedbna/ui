// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const treemapChartMeta: ComponentMeta = {
  "name": "treemap-chart",
  "usage": {
    "import": "import { TreeMapChart } from '@/components/charts/treemap-chart';",
    "snippet": "const data = [\n  { label: 'Sales', value: 120 },\n  { label: 'Marketing', value: 98 },\n  { label: 'Support', value: 86 },\n  { label: 'Development', value: 140 },\n];\n\n<TreeMapChart\n  data={data}\n  config={{\n    height: 300,\n    showLabels: true,\n    animated: true,\n  }}\n/>;"
  },
  "types": [
    {
      "name": "TreeMapChart",
      "description": "A customizable treemap chart component that uses the squarified treemap algorithm for optimal rectangle aspect ratios. Perfect for displaying hierarchical data with emphasis on proportional relationships between categories.",
      "props": [
        {
          "name": "data",
          "type": "TreeMapDataPoint[]",
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
      "name": "TreeMapDataPoint",
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
          "description": "Optional custom color for the rectangle."
        },
        {
          "name": "children",
          "type": "TreeMapDataPoint[]",
          "description": "Optional nested data for hierarchical display."
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
          "default": "`10`",
          "description": "Padding around the chart."
        },
        {
          "name": "showLabels",
          "type": "boolean",
          "default": "`true`",
          "description": "Whether to show labels for rectangles."
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
    "summary": "The TreeMapChart component includes several accessibility features:",
    "items": [
      "Semantic SVG structure for screen readers",
      "Proper contrast ratios with automatic text color adjustment",
      "Text labels for both categories and values",
      "Supports dynamic text sizing based on rectangle size",
      "High contrast borders for visual separation"
    ]
  }
};
