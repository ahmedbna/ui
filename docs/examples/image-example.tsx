// registry/demo/image-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ImageContentFit } from '@/docs/demo/image/image-content-fit';
import { ImageDemo } from '@/docs/demo/image/image-demo';
import { ImageError } from '@/docs/demo/image/image-error';
import { ImageGallery } from '@/docs/demo/image/image-gallery';
import { ImageLoading } from '@/docs/demo/image/image-loading';
import { ImageResponsive } from '@/docs/demo/image/image-responsive';
import { ImageSizes } from '@/docs/demo/image/image-sizes';
import { ImageVariants } from '@/docs/demo/image/image-variants';

// Main demo screen combining all demo
export function ImageExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Image
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <ImageDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Variants
        </Text>
        <ImageVariants />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Sizes
        </Text>
        <ImageSizes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Loading States
        </Text>
        <ImageLoading />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Error Handling
        </Text>
        <ImageError />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Content Fit Options
        </Text>
        <ImageContentFit />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Responsive Images
        </Text>
        <ImageResponsive />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Image Gallery
        </Text>
        <ImageGallery />
      </View>
    </View>
  );
}
