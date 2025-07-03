// registry/demo/separator-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { SeparatorColors } from '@/docs/examples/separator/separator-colors';
import { SeparatorDemo } from '@/docs/examples/separator/separator-demo';
import { SeparatorSpacing } from '@/docs/examples/separator/separator-spacing';
import { SeparatorThickness } from '@/docs/examples/separator/separator-thickness';
import { SeparatorVertical } from '@/docs/examples/separator/separator-vertical';
import React from 'react';

// Main demo screen combining all demo
export function SeparatorExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Separator
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <SeparatorDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Vertical Orientation
        </Text>
        <SeparatorVertical />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Thickness
        </Text>
        <SeparatorThickness />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Colors
        </Text>
        <SeparatorColors />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Spacing Variants
        </Text>
        <SeparatorSpacing />
      </View>
    </View>
  );
}
