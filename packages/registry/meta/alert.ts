// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const alertMeta: ComponentMeta = {
  name: 'alert',
  usage: {
    import:
      "import {\n  Alert,\n  AlertTitle,\n  AlertDescription,\n  showSuccessAlert,\n  showErrorAlert,\n  showConfirmAlert,\n  showNativeAlert,\n} from '@/components/ui/alert';",
    snippet:
      "<Alert>\n  <AlertTitle>Attention</AlertTitle>\n  <AlertDescription>\n    This is an important message that appears inline with your content.\n  </AlertDescription>\n</Alert>",
  },
  types: [
    {
      name: 'Alert',
      description: 'The main visual (inline) alert container component.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'The content to display inside the alert.',
        },
        {
          name: 'variant',
          type: "'default' | 'destructive'",
          default: "`'default'`",
          description: 'The visual style variant of the alert.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the alert container.',
        },
      ],
    },
    {
      name: 'AlertTitle',
      description: 'Displays the alert title.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'The title text to display.',
        },
        {
          name: 'style',
          type: 'TextStyle',
          description: 'Additional styles for the title text.',
        },
      ],
    },
    {
      name: 'AlertDescription',
      description: 'Displays the alert description.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'The description text to display.',
        },
        {
          name: 'style',
          type: 'TextStyle',
          description: 'Additional styles for the description text.',
        },
      ],
    },
    {
      name: 'NativeAlertOptions',
      description:
        'The options object accepted by `showNativeAlert`, and the shape the `showSuccessAlert`/`showErrorAlert`/`showConfirmAlert` shorthands build internally.',
      props: [
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'The alert title.',
        },
        {
          name: 'message',
          type: 'string',
          description: 'The alert body text.',
        },
        {
          name: 'buttons',
          type: "{ text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }[]",
          description:
            'Buttons to display. Defaults to a single "OK" button when omitted.',
        },
        {
          name: 'cancelable',
          type: 'boolean',
          default: '`true`',
          description:
            'Android only: whether tapping outside the alert dismisses it.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Alert component is built with accessibility in mind:',
    items: [
      'The inline `Alert` exposes `accessibilityRole="alert"` and `accessibilityLiveRegion` (`"assertive"` for the destructive variant, `"polite"` otherwise)',
      'Native alerts (`showNativeAlert` and its shorthands) use the platform `Alert` API, which is announced by the OS automatically',
    ],
  },
};
