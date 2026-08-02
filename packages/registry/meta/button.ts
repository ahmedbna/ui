// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const buttonMeta: ComponentMeta = {
  name: 'button',
  usage: {
    import: "import { Button } from '@/components/ui/button';",
    snippet:
      "<Button onPress={() => console.log('Button pressed!')}>Click me</Button>",
  },
  types: [
    {
      name: 'Button',
      description:
        'A pressable button component with multiple variants and states.',
      props: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The button content (text or custom elements).',
        },
        {
          name: 'onPress',
          type: '() => void',
          description: 'Function called when the button is pressed.',
        },
        {
          name: 'variant',
          type: 'ButtonVariant',
          default: "`'default'`",
          description: 'The visual style variant of the button.',
        },
        {
          name: 'size',
          type: 'ButtonSize',
          default: "`'default'`",
          description: 'The size of the button.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the button is disabled.',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the button is in loading state.',
        },
        {
          name: 'loadingVariant',
          type: 'SpinnerVariant',
          default: "`'default'`",
          description: 'The variant of the loading spinner.',
        },
        {
          name: 'animation',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to enable press animations.',
        },
        {
          name: 'haptic',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether to trigger haptic feedback on press (iOS and Android).',
        },
        {
          name: 'icon',
          type: 'ComponentType<LucideProps>',
          description: 'Icon component to display before the text.',
        },
        {
          name: 'label',
          type: 'string',
          description:
            'Fallback `accessibilityLabel` for screen readers, useful when `children` is not plain text (e.g. an icon-only button).',
        },
        {
          name: 'style',
          type: 'ViewStyle | ViewStyle[]',
          description: 'Additional styles for the button container.',
        },
        {
          name: 'textStyle',
          type: 'TextStyle',
          description: 'Additional styles for the button text.',
        },
      ],
    },
  ],
  variants: [
    {
      name: 'ButtonVariant',
      description: 'The available button variants:',
      values: [
        {
          value: 'default',
          description: 'Primary button with solid background',
        },
        {
          value: 'destructive',
          description: 'Red button for destructive actions',
        },
        {
          value: 'success',
          description: 'Green button for success actions',
        },
        {
          value: 'outline',
          description: 'Button with border and transparent background',
        },
        {
          value: 'secondary',
          description: 'Secondary button with muted colors',
        },
        {
          value: 'ghost',
          description: 'Button with no background',
        },
        {
          value: 'link',
          description: 'Text-only button with underline',
        },
      ],
    },
    {
      name: 'ButtonSize',
      description: 'The available button sizes:',
      values: [
        {
          value: 'default',
          description: 'Standard button size (48px height)',
        },
        {
          value: 'sm',
          description: 'Small button size (44px height)',
        },
        {
          value: 'lg',
          description: 'Large button size (54px height)',
        },
        {
          value: 'icon',
          description: 'Square button for icons only (48x48px)',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Button component is built with accessibility in mind:',
    items: [
      'Proper touch target size (minimum 44px)',
      'Disabled state prevents interaction and reduces opacity',
      'Loading state shows spinner with appropriate color contrast',
      'Supports screen readers with proper accessibility labels',
      'Responsive to system accessibility settings',
    ],
  },
};
