// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const inputOtpMeta: ComponentMeta = {
  name: 'input-otp',
  usage: {
    import:
      "import { InputOTP, InputOTPWithSeparator } from '@/components/ui/input-otp';",
    snippet:
      "<InputOTP\n  length={6}\n  value={otp}\n  onChangeText={setOtp}\n  onComplete={(value) => console.log('OTP Complete:', value)}\n/>",
  },
  types: [
    {
      name: 'InputOTP',
      description:
        'A one-time-password / verification-code input rendered as a row of digit slots, backed by a single hidden `TextInput`. Extends `TextInputProps` (except `style`, `value`, `onChangeText`).',
      props: [
        {
          name: 'length',
          type: 'number',
          default: '`6`',
          description: 'Number of OTP digits to display.',
        },
        {
          name: 'value',
          type: 'string',
          default: "`''`",
          description: 'Current OTP value.',
        },
        {
          name: 'onChangeText',
          type: '(value: string) => void',
          description: 'Called when the OTP value changes.',
        },
        {
          name: 'onComplete',
          type: '(value: string) => void',
          description: 'Called when the OTP is complete (all digits filled).',
        },
        {
          name: 'error',
          type: 'string',
          description: 'Error message to display below the input.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the input is disabled.',
        },
        {
          name: 'masked',
          type: 'boolean',
          default: '`false`',
          description: 'Whether to mask digits with dots for security.',
        },
        {
          name: 'showCursor',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show a cursor in the active slot.',
        },
        {
          name: 'separator',
          type: 'ReactNode',
          description: 'Custom separator rendered between slots.',
        },
        {
          name: 'containerStyle',
          type: 'ViewStyle',
          description: 'Additional styles for the container.',
        },
        {
          name: 'slotStyle',
          type: 'ViewStyle',
          description: 'Additional styles for individual digit slots.',
        },
        {
          name: 'errorStyle',
          type: 'TextStyle',
          description: 'Additional styles for the error message.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The InputOTP component is built with accessibility in mind:',
    items: [
      'The hidden `TextInput` sets `textContentType="oneTimeCode"` and `autoComplete="one-time-code"`, enabling native SMS autofill',
      'Each digit slot exposes an `accessibilityLabel` announcing its position and filled/empty state',
      'Error messages are rendered as visible text below the input',
    ],
  },
};
