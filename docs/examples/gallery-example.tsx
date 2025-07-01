// registry/examples/date-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { GalleryDemo } from '@/docs/demo/gallery/gallery-demo';
import { GalleryControls } from '@/docs/demo/gallery/gallery-controls';
import { GalleryGrid } from '@/docs/demo/gallery/gallery-grid';
import { GalleryInfo } from '@/docs/demo/gallery/gallery-info';
import { GalleryLayouts } from '@/docs/demo/gallery/gallery-layouts';
import { GalleryOverlay } from '@/docs/demo/gallery/gallery-overlay';

// Main demo screen combining all examples
export function GalleryExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 100,
        // justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Gallery
      </Text>

      {/* <View style={{ flex: 1 }}>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default Gallery
        </Text>
        <GalleryDemo />
      </View> */}

      {/* <View style={{ flex: 1 }}>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Grid
        </Text>
        <GalleryGrid />
      </View> */}

      {/* <View style={{ flex: 1 }}>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Titles and Descriptions
        </Text>
        <GalleryInfo />
      </View> */}

      {/* <View style={{ flex: 1 }}>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Layouts
        </Text>
        <GalleryLayouts />
      </View> */}

      {/* <View style={{ flex: 1 }}>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Controls
        </Text>
        <GalleryControls />
      </View> */}

      <View style={{ flex: 1 }}>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Overlays
        </Text>
        <GalleryOverlay />
      </View>
    </View>
  );
}
