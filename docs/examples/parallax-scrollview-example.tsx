// registry/examples/parallax-scrollview-example.tsx
import { View } from '@/components/ui/view';
import { ParallaxScrollViewArticle } from '@/docs/demo/parallax-scrollview/parallax-scrollview-article';
import { ParallaxScrollViewCustomHeight } from '@/docs/demo/parallax-scrollview/parallax-scrollview-custom-height';
import { ParallaxScrollViewDemo } from '@/docs/demo/parallax-scrollview/parallax-scrollview-demo';
import { ParallaxScrollViewGradient } from '@/docs/demo/parallax-scrollview/parallax-scrollview-gradient';
import { ParallaxScrollViewProduct } from '@/docs/demo/parallax-scrollview/parallax-scrollview-product';
import { ParallaxScrollViewProfile } from '@/docs/demo/parallax-scrollview/parallax-scrollview-profile';

// Main demo screen combining all examples
export function ParallaxScrollViewExample() {
  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollViewProduct />
    </View>
  );
}
