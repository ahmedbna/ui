import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { IconThemed } from '@/demo/icon/icon-themed';

// Main demo screen combining all demo
export function IconExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Icon
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <IconDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <IconSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Colors
        </Text>
        <IconColors />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Stroke Weights
        </Text>
        <IconStroke />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Interactive Icons
        </Text>
        <IconInteractive />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Icon Grid
        </Text>
        <IconGrid />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Themed Icons
        </Text>
        <IconThemed />
      </View>
    </View>
  );
}
