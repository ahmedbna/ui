// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const inputMeta: ComponentMeta = {
  "name": "input",
  "usage": {
    "import": "import { Input, GroupedInput, GroupedInputItem } from '@/components/ui/input';",
    "snippet": "<Input label='Username' placeholder='Enter your username' icon={User} />"
  },
  "types": [
    {
      "name": "Input",
      "description": "The main input component with label, validation, and icon support. Extends all `TextInputProps` except `style`.",
      "props": [
        {
          "name": "label",
          "type": "string",
          "description": "Label text displayed inside the input"
        },
        {
          "name": "error",
          "type": "string",
          "description": "Error message to display below the input"
        },
        {
          "name": "icon",
          "type": "React.ComponentType<LucideProps>",
          "description": "Lucide icon component to display on the left"
        },
        {
          "name": "rightComponent",
          "type": "ReactNode | (() => ReactNode)",
          "description": "Component or function returning component for right side"
        },
        {
          "name": "containerStyle",
          "type": "ViewStyle",
          "description": "Style for the outer container"
        },
        {
          "name": "inputStyle",
          "type": "TextStyle",
          "description": "Style for the text input"
        },
        {
          "name": "labelStyle",
          "type": "TextStyle",
          "description": "Style for the label text"
        },
        {
          "name": "errorStyle",
          "type": "TextStyle",
          "description": "Style for the error message"
        },
        {
          "name": "variant",
          "type": "'filled' | 'outline'",
          "default": "`'filled'`",
          "description": "Visual variant of the input"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether the input is disabled"
        }
      ]
    },
    {
      "name": "GroupedInput",
      "description": "Container component for grouping multiple inputs together.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "Child components (usually GroupedInputItem)"
        },
        {
          "name": "containerStyle",
          "type": "ViewStyle",
          "description": "Style for the container"
        },
        {
          "name": "title",
          "type": "string",
          "description": "Optional title for the group"
        },
        {
          "name": "titleStyle",
          "type": "TextStyle",
          "description": "Style for the title text"
        }
      ]
    },
    {
      "name": "GroupedInputItem",
      "description": "Input component designed to be used within GroupedInput. Extends all `TextInputProps` except `style`.",
      "props": [
        {
          "name": "label",
          "type": "string",
          "description": "Label text displayed inside the input"
        },
        {
          "name": "error",
          "type": "string",
          "description": "Error message (displayed at group level)"
        },
        {
          "name": "icon",
          "type": "React.ComponentType<LucideProps>",
          "description": "Lucide icon component to display on the left"
        },
        {
          "name": "rightComponent",
          "type": "ReactNode | (() => ReactNode)",
          "description": "Component or function returning component for right side"
        },
        {
          "name": "inputStyle",
          "type": "TextStyle",
          "description": "Style for the text input"
        },
        {
          "name": "labelStyle",
          "type": "TextStyle",
          "description": "Style for the label text"
        },
        {
          "name": "errorStyle",
          "type": "TextStyle",
          "description": "Style for the error message"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether the input is disabled"
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Input component is built with accessibility in mind:",
    "items": [
      "Proper focus management and keyboard navigation",
      "Screen reader support with semantic labeling",
      "High contrast support for error states",
      "Proper touch targets for mobile devices",
      "Support for dynamic text sizing",
      "Keyboard shortcuts and hardware keyboard support"
    ]
  }
};
