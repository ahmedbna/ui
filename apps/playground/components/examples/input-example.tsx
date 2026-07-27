import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { InputForm } from '@/demo/input/input-form';

// Main demo screen combining all demo
export function InputExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Input
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <InputDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Icons
        </Text>
        <InputIcons />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Variants
        </Text>
        <InputVariants />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Validation States
        </Text>
        <InputValidation />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Right Components
        </Text>
        <InputRightComponents />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled State
        </Text>
        <InputDisabled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Grouped Inputs
        </Text>
        <InputGrouped />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Complete Form
        </Text>
        <InputForm />
      </View>
    </View>
  );
}
