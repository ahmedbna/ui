// templates/demo/share-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ShareHook } from '@/templates/demo/share/share-hook';

// Main demo screen combining all demo
export function ShareExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Share
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <ShareDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Variants
        </Text>
        <ShareVariants />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <ShareSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          URL Only Sharing
        </Text>
        <ShareUrlOnly />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Content
        </Text>
        <ShareCustomContent />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Icon Only Buttons
        </Text>
        <ShareIconOnly />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Callbacks
        </Text>
        <ShareCallbacks />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Using useShare Hook
        </Text>
        <ShareHook />
      </View>
    </View>
  );
}
