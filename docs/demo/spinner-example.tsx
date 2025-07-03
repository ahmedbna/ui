// registry/demo/spinner-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { SpinnerColors } from '@/docs/examples/spinner/spinner-colors';
import { SpinnerDemo } from '@/docs/examples/spinner/spinner-demo';
import { SpinnerInline } from '@/docs/examples/spinner/spinner-inline';
import { SpinnerLabels } from '@/docs/examples/spinner/spinner-labels';
import { SpinnerOverlay } from '@/docs/examples/spinner/spinner-overlay';
import { SpinnerSizes } from '@/docs/examples/spinner/spinner-sizes';
import { SpinnerSpeeds } from '@/docs/examples/spinner/spinner-speeds';
import { SpinnerVariants } from '@/docs/examples/spinner/spinner-variants';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all demo
export function SpinnerExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Spinner
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <SpinnerDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Variants
        </Text>
        <SpinnerVariants />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <SpinnerSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Labels
        </Text>
        <SpinnerLabels />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Animation Speeds
        </Text>
        <SpinnerSpeeds />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Colors
        </Text>
        <SpinnerColors />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Inline Usage
        </Text>
        <SpinnerInline />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Loading Overlay
        </Text>
        <SpinnerOverlay />
      </View>
    </View>
  );
}
