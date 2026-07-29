// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const toggleMeta: ComponentMeta = {
  "name": "toggle",
  "usage": {
    "import": "import {\n  Toggle,\n  ToggleGroup,\n  ToggleGroupSingle,\n  ToggleGroupMultiple,\n} from '@/components/ui/toggle';",
    "snippet": "<Toggle pressed={pressed} onPressedChange={setPressed}>\n  <Bold size={16} />\n</Toggle>"
  },
  "types": [
    {
      "name": "Toggle",
      "description": "A two-state button that can be either on (pressed) or off.",
      "props": [
        {
          "name": "children",
          "type": "ReactNode",
          "description": "The content to display inside the toggle."
        },
        {
          "name": "pressed",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether the toggle is pressed (on)."
        },
        {
          "name": "onPressedChange",
          "type": "(pressed: boolean) => void",
          "description": "Callback fired when the pressed state changes."
        },
        {
          "name": "variant",
          "type": "'default' | 'outline'",
          "default": "`'default'`",
          "description": "The visual variant of the toggle."
        },
        {
          "name": "size",
          "type": "'default' | 'icon'",
          "default": "`'icon'`",
          "description": "The size of the toggle."
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether the toggle is disabled."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the toggle container."
        },
        {
          "name": "textStyle",
          "type": "TextStyle",
          "description": "Additional styles to apply to the toggle text."
        }
      ]
    },
    {
      "name": "ToggleGroup",
      "description": "A set of two-state buttons that can be toggled on or off.",
      "props": [
        {
          "name": "type",
          "type": "'single' | 'multiple'",
          "default": "`'single'`",
          "description": "Whether to allow single or multiple selection."
        },
        {
          "name": "value",
          "type": "string | string[]",
          "description": "The controlled value(s) of the toggle group."
        },
        {
          "name": "onValueChange",
          "type": "(value: string | string[]) => void",
          "description": "Callback fired when the value changes."
        },
        {
          "name": "items",
          "type": "ToggleGroupItem[]",
          "description": "Array of toggle items to render."
        },
        {
          "name": "variant",
          "type": "'default' | 'outline'",
          "default": "`'default'`",
          "description": "The visual variant of the toggles."
        },
        {
          "name": "size",
          "type": "'default' | 'icon'",
          "default": "`'default'`",
          "description": "The size of the toggles."
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether the entire group is disabled."
        },
        {
          "name": "style",
          "type": "ViewStyle",
          "description": "Additional styles to apply to the group container."
        },
        {
          "name": "orientation",
          "type": "'horizontal' | 'vertical'",
          "default": "`'horizontal'`",
          "description": "The orientation of the toggle group."
        }
      ]
    },
    {
      "name": "ToggleGroupItem",
      "description": "Configuration for individual items in a toggle group.",
      "props": [
        {
          "name": "value",
          "type": "string",
          "description": "The unique value for this toggle item."
        },
        {
          "name": "label",
          "type": "string",
          "description": "The text label for this toggle item."
        },
        {
          "name": "icon",
          "type": "React.ComponentType<LucideProps>",
          "description": "Optional icon component to display."
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "`false`",
          "description": "Whether this specific item is disabled."
        }
      ]
    },
    {
      "name": "ToggleGroupSingle",
      "description": "Convenience component for single-selection toggle groups.",
      "props": [
        {
          "name": "value",
          "type": "string",
          "description": "The controlled value of the selected toggle."
        },
        {
          "name": "onValueChange",
          "type": "(value: string) => void",
          "description": "Callback fired when the selected value changes."
        },
        {
          "name": "...props",
          "type": "Omit<ToggleGroupProps, ...>",
          "description": "All other ToggleGroup props except type and callbacks."
        }
      ]
    },
    {
      "name": "ToggleGroupMultiple",
      "description": "Convenience component for multiple-selection toggle groups.",
      "props": [
        {
          "name": "value",
          "type": "string[]",
          "description": "The controlled array of selected toggle values."
        },
        {
          "name": "onValueChange",
          "type": "(value: string[]) => void",
          "description": "Callback fired when the selected values change."
        },
        {
          "name": "...props",
          "type": "Omit<ToggleGroupProps, ...>",
          "description": "All other ToggleGroup props except type and callbacks."
        }
      ]
    }
  ],
  "accessibility": {
    "summary": "The Toggle components are built with accessibility in mind:",
    "items": [
      "Uses TouchableOpacity for proper touch handling",
      "Supports disabled state with visual feedback",
      "Proper color contrast for different states",
      "Screen reader compatible with semantic structure",
      "Keyboard navigation support through native React Native components"
    ]
  }
};
