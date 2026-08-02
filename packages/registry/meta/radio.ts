// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const radioMeta: ComponentMeta = {
  name: 'radio',
  usage: {
    import: "import { RadioGroup, RadioButton } from '@/components/ui/radio';",
    snippet:
      "const [value, setValue] = useState('option1');\n\n<RadioGroup\n  options={[\n    { label: 'Option 1', value: 'option1' },\n    { label: 'Option 2', value: 'option2' },\n    { label: 'Option 3', value: 'option3' },\n  ]}\n  value={value}\n  onValueChange={setValue}\n/>;",
  },
  types: [
    {
      name: 'RadioGroup',
      description:
        "The main container component that manages a group of radio buttons. Uses `value`/`onValueChange` (matching `ToggleGroup`'s group-selection convention) rather than `checkbox`'s `checked`/`onCheckedChange` or `toggle`'s `pressed`/`onPressedChange` — each naming convention matches its own control's interaction model and is intentional, not an inconsistency.",
      props: [
        {
          name: 'options',
          type: 'RadioOption[]',
          description: 'Array of radio button options.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'The currently selected value.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback fired when the selection changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the entire group is disabled.',
        },
        {
          name: 'orientation',
          type: "'vertical' | 'horizontal'",
          default: "`'vertical'`",
          description: 'Layout orientation of the radio buttons.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the group container.',
        },
        {
          name: 'optionStyle',
          type: 'ViewStyle',
          description: 'Additional styles for each radio button.',
        },
        {
          name: 'labelStyle',
          type: 'TextStyle',
          description: 'Additional styles for radio button labels.',
        },
      ],
    },
    {
      name: 'RadioButton',
      description: 'Individual radio button component for custom layouts.',
      props: [
        {
          name: 'option',
          type: 'RadioOption',
          description: 'The radio option data.',
        },
        {
          name: 'selected',
          type: 'boolean',
          description: 'Whether this radio button is selected.',
        },
        {
          name: 'onPress',
          type: '() => void',
          description: 'Callback fired when the button is pressed.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether this radio button is disabled.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the button container.',
        },
        {
          name: 'labelStyle',
          type: 'TextStyle',
          description: 'Additional styles for the button label.',
        },
      ],
    },
    {
      name: 'RadioOption',
      description: 'The shape of each radio option object.',
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'The display text for the radio button.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'The value associated with this option.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether this specific option is disabled.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Radio component is built with accessibility in mind:',
    items: [
      'Uses TouchableOpacity for proper touch feedback',
      'Supports disabled states with appropriate visual feedback',
      'Proper opacity changes for disabled options',
      'Screen reader friendly with semantic structure',
      'Supports keyboard navigation patterns',
      'Clear visual indicators for selected state',
    ],
  },
};
