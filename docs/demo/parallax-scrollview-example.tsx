// registry/demo/parallax-scrollview-example.tsx
import { View } from '@/components/ui/view';
import { ParallaxScrollViewArticle } from '@/docs/examples/parallax-scrollview/parallax-scrollview-article';
import { ParallaxScrollViewCustomHeight } from '@/docs/examples/parallax-scrollview/parallax-scrollview-custom-height';
import { ParallaxScrollViewDemo } from '@/docs/examples/parallax-scrollview/parallax-scrollview-demo';
import { ParallaxScrollViewGradient } from '@/docs/examples/parallax-scrollview/parallax-scrollview-gradient';
import { ParallaxScrollViewProduct } from '@/docs/examples/parallax-scrollview/parallax-scrollview-product';
import { ParallaxScrollViewProfile } from '@/docs/examples/parallax-scrollview/parallax-scrollview-profile';

// Main demo screen combining all demo
export function ParallaxScrollViewExample() {
  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollViewProduct />
    </View>
  );
}
