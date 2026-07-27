// docs/demo/toggle-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ToggleGroupOutline } from '@/templates/demo/toggle/toggle-group-outline';

// Main demo screen combining all demo
export function ToggleExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Toggle
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <ToggleDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Variants
        </Text>
        <ToggleVariants />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <ToggleSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Text
        </Text>
        <ToggleText />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled States
        </Text>
        <ToggleDisabled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Toggle Group Single Selection
        </Text>
        <ToggleGroupSingleDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Toggle Group Multiple Selection
        </Text>
        <ToggleGroupMultipleDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Vertical Toggle Group
        </Text>
        <ToggleGroupVertical />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Outline Toggle Group
        </Text>
        <ToggleGroupOutline />
      </View>
    </View>
  );
}
