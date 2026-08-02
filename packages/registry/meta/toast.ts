// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const toastMeta: ComponentMeta = {
  name: 'toast',
  usage: {
    import: "import { useToast } from '@/components/ui/toast';",
    snippet:
      "function MyComponent() {\n  const { toast } = useToast();\n\n  const showToast = () => {\n    toast({\n      title: 'Success!',\n      description: 'Your changes have been saved.',\n      variant: 'success',\n    });\n  };\n\n  return <Button onPress={showToast}>Show Toast</Button>;\n}",
  },
  types: [
    {
      name: 'ToastProvider',
      description:
        'Wraps your app (or a subtree) to enable `useToast()`. Renders active toasts in a top-level overlay.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          required: true,
          description: 'The wrapped app content.',
        },
        {
          name: 'maxToasts',
          type: 'number',
          default: '`3`',
          description:
            'Maximum number of toasts visible at once; oldest is dropped past this.',
        },
      ],
    },
    {
      name: 'ToastData',
      description: 'The shape passed to `toast(...)`.',
      props: [
        {
          name: 'id',
          type: 'string',
          description:
            'Unique identifier, auto-generated internally — not something callers of `toast(...)` provide themselves.',
        },
        {
          name: 'title',
          type: 'string',
          description: 'Toast title text.',
        },
        {
          name: 'description',
          type: 'string',
          description: 'Toast body text.',
        },
        {
          name: 'variant',
          type: "'default' | 'success' | 'error' | 'warning' | 'info'",
          default: "`'default'`",
          description: 'Visual style and icon.',
        },
        {
          name: 'duration',
          type: 'number',
          default: '`4000`',
          description:
            'Milliseconds before auto-dismiss. Set to `0` to disable auto-dismiss.',
        },
        {
          name: 'action',
          type: '{ label: string; onPress: () => void }',
          description:
            'An optional action button rendered alongside the dismiss button.',
        },
      ],
    },
    {
      name: 'useToast',
      description: 'Returned by the `useToast()` hook.',
      props: [
        {
          name: 'toast',
          type: '(data: Omit<ToastData, "id">) => void',
          description: 'Show a toast with the given data.',
        },
        {
          name: 'success',
          type: '(title: string, description?: string) => void',
          description:
            "Shorthand for `toast({ title, description, variant: 'success' })`.",
        },
        {
          name: 'error',
          type: '(title: string, description?: string) => void',
          description:
            "Shorthand for `toast({ title, description, variant: 'error' })`.",
        },
        {
          name: 'warning',
          type: '(title: string, description?: string) => void',
          description:
            "Shorthand for `toast({ title, description, variant: 'warning' })`.",
        },
        {
          name: 'info',
          type: '(title: string, description?: string) => void',
          description:
            "Shorthand for `toast({ title, description, variant: 'info' })`.",
        },
        {
          name: 'dismiss',
          type: '(id: string) => void',
          description: 'Dismiss a specific toast by id.',
        },
        {
          name: 'dismissAll',
          type: '() => void',
          description: 'Dismiss every active toast.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Toast component is built with accessibility in mind:',
    items: [
      'Each toast exposes `accessibilityRole="alert"` and `accessibilityLiveRegion="polite"` so screen readers announce it as it appears',
      'The entry/exit spring animation and swipe-to-dismiss gesture are gated behind `AccessibilityInfo.isReduceMotionEnabled()`',
      'Dismissible with both a swipe gesture and an explicit close button',
    ],
  },
};
