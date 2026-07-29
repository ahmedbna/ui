// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const spinnerMeta: ComponentMeta = {
  "name": "spinner",
  "usage": {
    "import": "import {\n  Spinner,\n  LoadingOverlay,\n  InlineLoader,\n  ButtonSpinner,\n} from '@/components/ui/spinner';",
    "snippet": "<Spinner size='default' variant='default' />"
  },
  "types": [
    {
      "name": "Spinner",
      "description": "The main spinner component with multiple variants and customization options.",
      "props": [
        {
          "name": "size",
          "type": "'default' | 'sm' | 'lg' | 'icon'",
          "default": "`'default'`",
          "description": "The size of the spinner."
        },
        {
          "name": "variant",
          "type": "'default' | 'circle' | 'dots' | 'pulse' | 'bars'",
          "default": "`'default'`",
          "description": "The visual variant of the spinner."
        },
        {
          "name": "label",
          "type": "string",
          "description": "Optional label text to display with spinner."
        },
        {
          "name": "showLabel",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether to show the default \"Loading...\" label."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the container."
        },
        {
          "name": "color",
          "type": "string",
          "description": "Custom color for the spinner."
        },
        {
          "name": "speed",
          "type": "'slow' | 'normal' | 'fast'",
          "default": "`'normal'`",
          "description": "Animation speed of the spinner."
        }
      ]
    },
    {
      "name": "LoadingOverlay",
      "description": "A full-screen overlay component with spinner for blocking UI interactions during loading.",
      "props": [
        {
          "name": "visible",
          "type": "boolean",
          "description": "Whether the overlay is visible."
        },
        {
          "name": "backdrop",
          "type": "boolean",
          "default": "`true`",
          "description": "Whether to show a backdrop behind the spinner."
        },
        {
          "name": "backdropColor",
          "type": "string",
          "description": "Custom backdrop color."
        },
        {
          "name": "backdropOpacity",
          "type": "number",
          "default": "`0.5`",
          "description": "Opacity of the backdrop (0-1)."
        },
        {
          "name": "onRequestClose",
          "type": "() => void",
          "description": "Callback when overlay should be closed."
        },
        {
          "name": "...spinnerProps",
          "type": "SpinnerProps",
          "description": "All props from the Spinner component."
        }
      ]
    },
    {
      "name": "InlineLoader",
      "description": "A compact spinner optimized for inline usage within text or small containers.",
      "props": [
        {
          "name": "size",
          "type": "'default' | 'sm' | 'lg' | 'icon'",
          "default": "`'sm'`",
          "description": "The size of the spinner."
        },
        {
          "name": "variant",
          "type": "'default' | 'circle' | 'dots' | 'pulse' | 'bars'",
          "default": "`'default'`",
          "description": "The visual variant of the spinner."
        },
        {
          "name": "color",
          "type": "string",
          "description": "Custom color for the spinner."
        }
      ]
    },
    {
      "name": "ButtonSpinner",
      "description": "A spinner component specifically designed for button loading states.",
      "props": [
        {
          "name": "size",
          "type": "'default' | 'sm' | 'lg' | 'icon'",
          "default": "`'sm'`",
          "description": "The size of the spinner."
        },
        {
          "name": "variant",
          "type": "'default' | 'circle' | 'dots' | 'pulse' | 'bars'",
          "default": "`'default'`",
          "description": "The visual variant of the spinner."
        },
        {
          "name": "color",
          "type": "string",
          "description": "Custom color for the spinner."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Spinner component is built with accessibility in mind:",
    "items": [
      "Provides meaningful loading states for screen readers",
      "Supports custom labels for better context",
      "Maintains proper contrast ratios for visibility",
      "Non-intrusive animations that respect user preferences",
      "Loading overlays properly manage focus and interaction states"
    ]
  }
};
