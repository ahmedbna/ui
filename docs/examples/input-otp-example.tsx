// registry/demo/input-otp-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { InputOTPDemo } from '@/docs/demo/input-otp/input-otp-demo';
import { InputOTPDisabled } from '@/docs/demo/input-otp/input-otp-disabled';
import { InputOTPError } from '@/docs/demo/input-otp/input-otp-error';
import { InputOTPLengths } from '@/docs/demo/input-otp/input-otp-lengths';
import { InputOTPMasked } from '@/docs/demo/input-otp/input-otp-masked';
import { InputOTPNoCursor } from '@/docs/demo/input-otp/input-otp-no-cursor';
import { InputOTPSeparator } from '@/docs/demo/input-otp/input-otp-separator';
import { InputOTPStyled } from '@/docs/demo/input-otp/input-otp-styled';

// Main demo screen combining all demo
export function InputOTPExample() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Input OTP
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <InputOTPDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Lengths
        </Text>
        <InputOTPLengths />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Separators
        </Text>
        <InputOTPSeparator />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Masked Input
        </Text>
        <InputOTPMasked />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Error State
        </Text>
        <InputOTPError />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled State
        </Text>
        <InputOTPDisabled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <InputOTPStyled />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Cursor Options
        </Text>
        <InputOTPNoCursor />
      </View>
    </View>
  );
}
