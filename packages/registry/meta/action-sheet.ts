// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const actionSheetMeta: ComponentMeta = {
  name: 'action-sheet',
  types: [
    {
      name: 'ActionSheet',
      description:
        'A sheet of choices. Uses the native ActionSheetIOS on iOS and a custom animated sheet elsewhere.',
      props: [
        {
          name: 'visible',
          type: 'boolean',
          required: true,
          description: 'Whether the sheet is shown.',
        },
        {
          name: 'onClose',
          type: '() => void',
          required: true,
          description:
            'Called when the sheet is dismissed, by choosing an option or by tapping the backdrop.',
        },
        {
          name: 'options',
          type: 'ActionSheetOption[]',
          required: true,
          description: 'The choices to present.',
        },
        {
          name: 'title',
          type: 'string',
          description: 'Optional title shown above the options.',
        },
        {
          name: 'message',
          type: 'string',
          description: 'Optional message shown below the title.',
        },
        {
          name: 'cancelButtonTitle',
          type: 'string',
          default: "`'Cancel'`",
          description: 'Label for the cancel action.',
        },
        {
          name: 'haptic',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether to trigger haptic feedback when an option is chosen — a warning for destructive options, a selection otherwise. Dismissing the sheet stays silent.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description:
            'Additional styles for the sheet container. Ignored on iOS, which renders the native sheet.',
        },
      ],
    },
    {
      name: 'ActionSheetOption',
      description: 'A single choice within the sheet.',
      props: [
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'The option label.',
        },
        {
          name: 'onPress',
          type: '() => void',
          required: true,
          description: 'Called when the option is chosen.',
        },
        {
          name: 'destructive',
          type: 'boolean',
          default: '`false`',
          description:
            'Marks the option as destructive — styled in red, and given warning rather than selection haptics.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the option can be chosen.',
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description:
            'Optional icon shown beside the label. Not rendered by the native iOS sheet.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The ActionSheet component follows accessibility best practices:',
    items: [
      'Proper focus management when opened/closed',
      'Screen reader announcements for destructive actions',
      'Keyboard navigation support where applicable',
      'Respects system accessibility settings',
    ],
  },
};
