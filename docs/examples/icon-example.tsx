// registry/demo/icon-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { IconColors } from '@/docs/demo/icon/icon-colors';
import { IconDemo } from '@/docs/demo/icon/icon-demo';
import { IconGrid } from '@/docs/demo/icon/icon-grid';
import { IconInteractive } from '@/docs/demo/icon/icon-interactive';
import { IconSizes } from '@/docs/demo/icon/icon-sizes';
import { IconStroke } from '@/docs/demo/icon/icon-stroke';
import { IconThemed } from '@/docs/demo/icon/icon-themed';

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
