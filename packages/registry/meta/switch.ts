// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const switchMeta: ComponentMeta = {
  name: 'switch',
  usage: {
    import: "import { Switch } from '@/components/ui/switch';",
    snippet:
      "<Switch\n  label='Enable notifications'\n  value={isEnabled}\n  onValueChange={setIsEnabled}\n/>",
  },
  types: [
    {
      name: 'Switch',
      description:
        'A toggle switch component with optional label and error states.',
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text for the switch.',
        },
        {
          name: 'error',
          type: 'string',
          description: 'Error message to display (changes label color).',
        },
        {
          name: 'labelStyle',
          type: 'TextStyle',
          description: 'Additional styles to apply to the label text.',
        },
        {
          name: 'value',
          type: 'boolean',
          description: 'The current state of the switch.',
        },
        {
          name: 'onValueChange',
          type: '(value: boolean) => void',
          description: 'Callback fired when the switch state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the switch is disabled.',
        },
        {
          name: '...props',
          type: '`SwitchProps` (from React Native)',
          description: 'All other React Native Switch props are supported.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Switch component is built with accessibility in mind:',
    items: [
      'Uses native React Native Switch for optimal platform behavior',
      'Supports screen reader announcements for state changes',
      'Proper focus management and keyboard navigation',
      'Color contrast meets accessibility standards',
      'Label text is properly associated with the switch control',
      'Error states provide clear feedback to assistive technologies',
    ],
  },
};
