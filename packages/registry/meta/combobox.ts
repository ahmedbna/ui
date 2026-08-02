// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const comboboxMeta: ComponentMeta = {
  name: 'combobox',
  usage: {
    import:
      "import {\n  Combobox,\n  ComboboxTrigger,\n  ComboboxValue,\n  ComboboxContent,\n  ComboboxInput,\n  ComboboxList,\n  ComboboxEmpty,\n  ComboboxItem,\n} from '@/components/ui/combobox';",
    snippet:
      "<Combobox value={value} onValueChange={setValue}>\n  <ComboboxTrigger>\n    <ComboboxValue placeholder='Select a framework...' />\n  </ComboboxTrigger>\n  <ComboboxContent>\n    <ComboboxInput placeholder='Search...' />\n    <ComboboxList>\n      <ComboboxEmpty>No results found.</ComboboxEmpty>\n      <ComboboxItem value='next'>Next.js</ComboboxItem>\n      <ComboboxItem value='expo'>Expo</ComboboxItem>\n    </ComboboxList>\n  </ComboboxContent>\n</Combobox>",
  },
  types: [
    {
      name: 'Combobox',
      description:
        'The root component that manages state and context for all child components. Operates on an `OptionType` object (`{ value: string; label: string }`) for its state.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The combobox components.',
        },
        {
          name: 'value',
          type: 'OptionType | null',
          default: '`null`',
          description: 'The selected option object (for single selection).',
        },
        {
          name: 'onValueChange',
          type: '(option: OptionType | null) => void',
          description: 'Callback when a single option object changes.',
        },
        {
          name: 'values',
          type: 'OptionType[]',
          default: '`[]`',
          description: 'An array of selected option objects (multiple selection).',
        },
        {
          name: 'onValuesChange',
          type: '(options: OptionType[]) => void',
          description: 'Callback when the array of selected options changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'If true, the combobox is disabled.',
        },
        {
          name: 'multiple',
          type: 'boolean',
          default: '`false`',
          description: 'If true, allows multiple selections.',
        },
      ],
    },
    {
      name: 'ComboboxTrigger',
      description: 'The button that triggers the combobox dropdown.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The trigger content (usually `ComboboxValue`).',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the trigger.',
        },
        {
          name: 'error',
          type: 'boolean',
          default: '`false`',
          description: 'If true, shows error styling on the border.',
        },
      ],
    },
    {
      name: 'ComboboxValue',
      description: 'Displays the selected value(s) or placeholder text.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: '`"Select..."`',
          description: 'Placeholder text when no value is set.',
        },
        {
          name: 'style',
          type: 'TextStyle',
          description: 'Additional styles for the text.',
        },
      ],
    },
    {
      name: 'ComboboxContent',
      description: 'The modal container for the dropdown content.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The dropdown content.',
        },
        {
          name: 'maxHeight',
          type: 'number',
          default: '`400`',
          description: 'Maximum height of the dropdown.',
        },
      ],
    },
    {
      name: 'ComboboxInput',
      description: 'The search input field within the dropdown.',
      props: [
        {
          name: 'placeholder',
          type: 'string',
          default: '`"Search..."`',
          description: 'Placeholder text for the input.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the container.',
        },
        {
          name: 'autoFocus',
          type: 'boolean',
          default: '`true`',
          description: 'If true, auto-focuses the input.',
        },
      ],
    },
    {
      name: 'ComboboxList',
      description: 'A scrollable container for the list of options with filtering capability.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The list items and groups.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the list.',
        },
      ],
    },
    {
      name: 'ComboboxEmpty',
      description: 'Displays when no items match the search query.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The empty state content.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the container.',
        },
      ],
    },
    {
      name: 'ComboboxGroup',
      description: 'Groups related options with an optional heading.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The group items.',
        },
        {
          name: 'heading',
          type: 'string',
          description: 'Optional heading for the group.',
        },
      ],
    },
    {
      name: 'ComboboxItem',
      description: 'An individual selectable option within the combobox.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The item content. Used as the `label` for the option.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'The unique value of the item.',
        },
        {
          name: 'onSelect',
          type: '(value: OptionType) => void',
          description: 'Callback when the item is selected, receiving the full option object.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'If true, the item cannot be selected.',
        },
        {
          name: 'searchValue',
          type: 'string',
          description: 'A custom string to use for search filtering instead of the label.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the item.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Combobox component is built with accessibility in mind:',
    items: [
      'The trigger exposes `accessibilityRole="combobox"` and `accessibilityState={{ expanded }}`',
      'Each item exposes `accessibilityRole="menuitem"` and `accessibilityState={{ selected, disabled }}`',
    ],
  },
};
