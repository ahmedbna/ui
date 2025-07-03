// registry/demo/radio-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { RadioDemo } from '@/docs/examples/radio/radio-demo';
import { RadioDisabled } from '@/docs/examples/radio/radio-disabled';
import { RadioForm } from '@/docs/examples/radio/radio-form';
import { RadioHorizontal } from '@/docs/examples/radio/radio-horizontal';
import { RadioLarge } from '@/docs/examples/radio/radio-large';
import { RadioSingle } from '@/docs/examples/radio/radio-single';
import { RadioStyled } from '@/docs/examples/radio/radio-styled';

// Main demo screen combining all demo
export function RadioExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Radio
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <RadioDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Horizontal Layout
        </Text>
        <RadioHorizontal />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled Options
        </Text>
        <RadioDisabled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <RadioStyled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Large Size
        </Text>
        <RadioLarge />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Individual Radio Buttons
        </Text>
        <RadioSingle />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Form Integration
        </Text>
        <RadioForm />
      </View>
    </View>
  );
}
