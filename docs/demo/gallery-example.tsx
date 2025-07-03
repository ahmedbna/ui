// registry/demo/date-picker-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { GalleryDemo } from '@/docs/examples/gallery/gallery-demo';
import { GalleryControls } from '@/docs/examples/gallery/gallery-controls';
import { GalleryGrid } from '@/docs/examples/gallery/gallery-grid';
import { GalleryInfo } from '@/docs/examples/gallery/gallery-info';
import { GalleryLayouts } from '@/docs/examples/gallery/gallery-layouts';
import { GalleryOverlay } from '@/docs/examples/gallery/gallery-overlay';

// Main demo screen combining all demo
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
