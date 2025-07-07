// templates/demo/popover-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { PopoverMenu } from '@/templates/demo/popover/popover-menu';

// Main demo screen combining all demo
export function PopoverExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Popover
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <PopoverDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Positioning
        </Text>
        <PopoverPositioning />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Alignment
        </Text>
        <PopoverAlignment />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Controlled State
        </Text>
        <PopoverControlled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Content & Styling
        </Text>
        <PopoverCustom />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Form Content
        </Text>
        <PopoverForm />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Menu Style
        </Text>
        <PopoverMenu />
      </View>
    </View>
  );
}
