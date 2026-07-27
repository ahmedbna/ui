// docs/demo/button-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ButtonVariants } from '@/demo/button/button-variants';

// Main demo screen combining all button demo
export function ButtonExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Button
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <ButtonDemo />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Variants
        </Text>
        <ButtonVariants />
      </View>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <ButtonSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Icons
        </Text>
        <ButtonWithIcons />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Icon Only
        </Text>
        <ButtonIconOnly />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Loading States
        </Text>
        <ButtonLoading />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled States
        </Text>
        <ButtonDisabled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <ButtonCustom />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Animation Control
        </Text>
        <ButtonAnimation />
      </View> */}
    </View>
  );
}
