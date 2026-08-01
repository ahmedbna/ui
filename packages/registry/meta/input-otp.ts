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
  accessibility: {
    summary: 'The InputOTP component is built with accessibility in mind:',
    items: [
      'Uses a hidden TextInput for proper keyboard handling and screen reader support',
      'Supports dynamic text sizing for better readability',
      'Provides proper focus management between slots',
      'Error messages are announced by screen readers',
      'Maintains proper contrast ratios for all states',
      'Supports keyboard navigation and input',
    ],
  },
};
