import { View } from '@/components/ui/view';
import { ParallaxScrollViewProduct } from '@/demo/parallax-scrollview/parallax-scrollview-product';

// Main demo screen combining all demo
export function ParallaxScrollViewExample() {
  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollViewProduct />
    </View>
  );
}
