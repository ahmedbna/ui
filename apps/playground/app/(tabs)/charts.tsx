import { ChartsDemo } from '@/components/charts-demo';
import { ScrollView } from '@/components/ui/scroll-view';
import { View } from '@/components/ui/view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function ChartsScreen() {
  const bottom = useBottomTabBarHeight();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 100,
          paddingBottom: bottom + 20, // Add bottom padding for better spacing
        }}
      >
        <ChartsDemo />
      </ScrollView>
    </View>
  );
}
