// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const datePickerMeta: ComponentMeta = {
  name: 'date-picker',
  usage: {
    import: "import { DatePicker } from '@/components/ui/date-picker';",
    snippet:
      "const [selectedDate, setSelectedDate] = useState<Date | undefined>();\n\n<DatePicker\n  label='Select Date'\n  value={selectedDate}\n  onChange={setSelectedDate}\n  placeholder='Choose a date'\n/>;",
  },
  types: [
    {
      name: 'DatePicker',
      description:
        'The main date picker component that handles date and time selection.',
      props: [
        {
          name: 'label',
          type: 'string',
          description: 'Label text displayed above the picker.',
        },
        {
          name: 'value',
          type: 'Date | DateRange',
          description:
            'The currently selected date. `DateRange` (`{ startDate, endDate }`) when `mode` is `"range"`, otherwise a plain `Date`.',
        },
        {
          name: 'onChange',
          type: '(value: Date | undefined) => void | (value: DateRange | undefined) => void',
          description:
            'Callback fired when the selection changes. Receives a `DateRange | undefined` when `mode` is `"range"`, otherwise a `Date | undefined`.',
        },
        {
          name: 'mode',
          type: "'date' | 'range' | 'time' | 'datetime'",
          default: "`'date'`",
          description:
            'The picker mode. `value`/`onChange` switch shape based on this: `DateRange` for `"range"`, `Date` for every other mode.',
        },
        {
          name: 'placeholder',
          type: 'string',
          default: "`'Select date'`",
          description: 'Placeholder text when no date is selected.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the picker is disabled.',
        },
        {
          name: 'error',
          type: 'string',
          description: 'Error message to display.',
        },
        {
          name: 'minimumDate',
          type: 'Date',
          description: 'The minimum selectable date.',
        },
        {
          name: 'maximumDate',
          type: 'Date',
          description: 'The maximum selectable date.',
        },
        {
          name: 'timeFormat',
          type: "'12' | '24'",
          default: "`'24'`",
          description: 'Time format for time and datetime modes.',
        },
        {
          name: 'variant',
          type: "'filled' | 'outline' | 'group'",
          default: "`'filled'`",
          description: 'Visual variant of the picker trigger.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the trigger container.',
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
      name: 'DateRange',
      description: 'The value shape used when `mode` is `"range"`.',
      props: [
        {
          name: 'startDate',
          type: 'Date | null',
          description: 'The start of the selected range.',
        },
        {
          name: 'endDate',
          type: 'Date | null',
          description: 'The end of the selected range.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The DatePicker component follows accessibility best practices:',
    items: [
      'Uses semantic markup for screen readers',
      'Provides proper ARIA labels and descriptions',
      'Supports keyboard navigation',
      'Maintains focus management in the bottom sheet',
      'Offers high contrast support for visually impaired users',
      'Includes proper error announcement',
    ],
  },
};
