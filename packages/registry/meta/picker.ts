// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const pickerMeta: ComponentMeta = {
  name: 'picker',
  usage: {
    import: "import { Picker } from '@/components/ui/picker';",
    snippet:
      "<Picker\n  options={[\n    { label: 'Option 1', value: '1' },\n    { label: 'Option 2', value: '2' },\n    { label: 'Option 3', value: '3' },\n  ]}\n  value={selectedValue}\n  onValueChange={setSelectedValue}\n  placeholder='Select an option...'\n/>",
  },
  types: [
    {
      name: 'Picker',
      description:
        'The main picker component that displays options in a modal.',
      props: [
        {
          name: 'haptic',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether to trigger haptic feedback when the picker opens and when an option is selected.',
        },
        {
          name: 'options',
          type: 'PickerOption[]',
          default: '`[]`',
          description: 'Array of options to display.',
        },
        {
          name: 'sections',
          type: 'PickerSection[]',
          default: '`[]`',
          description: 'Array of sections containing grouped options.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Currently selected value (single selection).',
        },
        {
          name: 'values',
          type: 'string[]',
          default: '`[]`',
          description: 'Currently selected values (multiple selection).',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: '`"Select an option..."`',
          description: 'Placeholder text when no option is selected.',
        },
        {
          name: 'error',
          type: 'string',
          description: 'Error message to display.',
        },
        {
          name: 'variant',
          type: '"outline" | "filled" | "group"',
          default: '`"filled"`',
          description: 'Visual variant of the picker.',
        },
        {
          name: 'onValueChange',
          type: '(value: string) => void',
          description: 'Callback when single selection changes.',
        },
        {
          name: 'onValuesChange',
          type: '(values: string[]) => void',
          description: 'Callback when multiple selection changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the picker is disabled.',
        },
        {
          name: 'multiple',
          type: 'boolean',
          default: '`false`',
          description: 'Enable multiple selection mode.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Label text to display.',
        },
        {
          name: 'icon',
          type: 'React.ComponentType<LucideProps>',
          description: 'Icon component to display.',
        },
        {
          name: 'rightComponent',
          type: 'ReactNode | (() => ReactNode)',
          description: 'Custom component to display on the right side.',
        },
        {
          name: 'modalTitle',
          type: 'string',
          description: 'Title for the modal header.',
        },
        {
          name: 'searchable',
          type: 'boolean',
          default: '`false`',
          description: 'Enable search functionality.',
        },
        {
          name: 'searchPlaceholder',
          type: 'string',
          default: '`"Search options..."`',
          description: 'Placeholder for search input.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the picker container.',
        },
        {
          name: 'inputStyle',
          type: 'TextStyle',
          description: 'Additional styles for the input text.',
        },
        {
          name: 'labelStyle',
          type: 'TextStyle',
          description: 'Additional styles for the label text.',
        },
        {
          name: 'errorStyle',
          type: 'TextStyle',
          description: 'Additional styles for the error text.',
        },
      ],
    },
    {
      name: 'PickerOption',
      description: 'Interface for individual picker options.',
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'Display text for the option.',
        },
        {
          name: 'value',
          type: 'string',
          description: 'Unique value for the option.',
        },
        {
          name: 'description',
          type: 'string',
          description: 'Optional description text.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          description: 'Whether the option is disabled.',
        },
      ],
    },
    {
      name: 'PickerSection',
      description: 'Interface for grouping options into sections.',
      props: [
        {
          name: 'title',
          type: 'string',
          description: 'Optional section title.',
        },
        {
          name: 'options',
          type: 'PickerOption[]',
          description: 'Array of options in section.',
        },
      ],
    },
  ],
};
