// registry/examples/skeleton-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { SkeletonCard } from '@/docs/demo/skeleton/skeleton-card';
import { SkeletonDemo } from '@/docs/demo/skeleton/skeleton-demo';
import { SkeletonList } from '@/docs/demo/skeleton/skeleton-list';
import { SkeletonProfile } from '@/docs/demo/skeleton/skeleton-profile';
import { SkeletonShapes } from '@/docs/demo/skeleton/skeleton-shapes';
import { SkeletonSizes } from '@/docs/demo/skeleton/skeleton-sizes';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function SkeletonExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Skeleton
      </Text>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <SkeletonDemo />
      </View>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <SkeletonSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Card Layout
        </Text>
        <SkeletonCard />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Profile Layout
        </Text>
        <SkeletonProfile />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          List Items
        </Text>
        <SkeletonList />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Shapes
        </Text>
        <SkeletonShapes />
      </View> */}
    </View>
  );
}
