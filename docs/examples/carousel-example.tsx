// registry/examples/carousel-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { CarouselArrows } from '@/docs/demo/carousel/carousel-arrows';
import { CarouselCards } from '@/docs/demo/carousel/carousel-cards';
import { CarouselCustomWidth } from '@/docs/demo/carousel/carousel-custom-width';
import { CarouselDemo } from '@/docs/demo/carousel/carousel-demo';
import { CarouselImages } from '@/docs/demo/carousel/carousel-images';
import { CarouselManual } from '@/docs/demo/carousel/carousel-manual';
import { CarouselNoIndicators } from '@/docs/demo/carousel/carousel-no-indicators';

// Main demo screen combining all carousel examples
export function CarouselExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Carousel
      </Text>

      {/* <View>
        <Text variant='title'>Default Carousel</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Basic carousel with auto-play and indicators
        </Text>

        <CarouselDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>With Navigation Arrows</Text>
        <Text variant='body' style={{ marginBottom: 16, opacity: 0.7 }}>
          Carousel with arrows, indicators, and loop mode
        </Text>
        <CarouselArrows />
      </View> */}

      {/* <View>
        <Text variant='title'>Custom Item Width</Text>
        <Text variant='body' style={{ marginBottom: 16, opacity: 0.7 }}>
          Multi-item view with custom spacing
        </Text>
        <CarouselCustomWidth />
      </View> */}

      {/* <View>
        <Text variant='title'>Image Gallery</Text>
        <Text variant='body' style={{ marginBottom: 16, opacity: 0.7 }}>
          Auto-playing image carousel with overlays
        </Text>
        <CarouselImages />
      </View> */}

      {/* <View>
        <Text variant='title'>Card Layout</Text>
        <Text variant='body' style={{ marginBottom: 16, opacity: 0.7 }}>
          Event cards with detailed information
        </Text>
        <CarouselCards />
      </View> */}

      {/* <View>
        <Text variant='title'>Arrows Only</Text>
        <Text variant='body' style={{ marginBottom: 16, opacity: 0.7 }}>
          Navigation without indicators
        </Text>
        <CarouselNoIndicators />
      </View> */}

      <View>
        <Text variant='title'>Manual Control</Text>
        <Text variant='body' style={{ marginBottom: 16, opacity: 0.7 }}>
          External controls with progress tracking
        </Text>
        <CarouselManual />
      </View>
    </View>
  );
}
