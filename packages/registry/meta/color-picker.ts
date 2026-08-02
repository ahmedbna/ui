// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const colorPickerMeta: ComponentMeta = {
  name: 'color-picker',
  usage: {
    import:
      "import { ColorPicker, ColorSwatch } from '@/components/ui/color-picker';",
    snippet:
      "<ColorPicker\n  value='#ff0000'\n  onColorChange={(color) => console.log('Color changed:', color)}\n  onColorSelect={(color) => console.log('Color selected:', color)}\n/>",
  },
  types: [
    {
      name: 'ColorPicker',
      description:
        'The main color picker component that displays a swatch and opens a modal for color selection.',
      props: [
        {
          name: 'value',
          type: 'string',
          default: "`'#ff0000'`",
          description: 'The current color value in hex format.',
        },
        {
          name: 'onColorChange',
          type: '(color: string) => void',
          description:
            'Callback fired when the color changes during selection.',
        },
        {
          name: 'onColorSelect',
          type: '(color: string) => void',
          description: 'Callback fired when the user confirms color selection.',
        },
        {
          name: 'swatchSize',
          type: 'number',
          default: '`HEIGHT`',
          description: 'The size of the color swatch in pixels.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the color picker is disabled.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the container.',
        },
      ],
    },
    {
      name: 'ColorSwatch',
      description:
        'A standalone color swatch component that can be used independently.',
      props: [
        {
          name: 'color',
          type: 'string',
          description: 'The color to display in hex format.',
        },
        {
          name: 'size',
          type: 'number',
          default: '`32`',
          description: 'The size of the swatch in pixels.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the swatch.',
        },
        {
          name: 'onPress',
          type: '() => void',
          description: 'Callback fired when the swatch is pressed.',
        },
        {
          name: 'accessibilityLabel',
          type: 'string',
          description:
            'Accessibility label for screen readers. Defaults to `"Color swatch {color}"` when omitted.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The ColorPicker component is built with accessibility in mind:',
    items: [
      'Color values are displayed in uppercase hex format for easy reading',
      'High contrast knobs for better visibility',
      'Proper touch targets for gesture interactions',
      'Modal provides clear cancel and confirm actions',
      'Color preview shows the selected color prominently',
    ],
  },
};
