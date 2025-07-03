// registry/demo/share-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ShareCallbacks } from '@/docs/examples/share/share-callbacks';
import { ShareCustomContent } from '@/docs/examples/share/share-custom-content';
import { ShareDemo } from '@/docs/examples/share/share-demo';
import { ShareHook } from '@/docs/examples/share/share-hook';
import { ShareIconOnly } from '@/docs/examples/share/share-icon-only';
import { ShareSizes } from '@/docs/examples/share/share-sizes';
import { ShareUrlOnly } from '@/docs/examples/share/share-url-only';
import { ShareVariants } from '@/docs/examples/share/share-variants';

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
