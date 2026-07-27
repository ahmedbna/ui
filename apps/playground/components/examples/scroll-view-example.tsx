import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ScrollViewInset } from '@/demo/scroll-view/scroll-view-inset';

// Main demo screen combining all demo
export function ScrollViewExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        ScrollView
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <ScrollViewDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Vertical Scrolling
        </Text>
        <ScrollViewVertical />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Horizontal Scrolling
        </Text>
        <ScrollViewHorizontal />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Nested ScrollViews
        </Text>
        <ScrollViewNested />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Pull to Refresh
        </Text>
        <ScrollViewRefresh />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <ScrollViewStyled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Scroll Indicators
        </Text>
        <ScrollViewIndicators />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Content Inset Adjustments
        </Text>
        <ScrollViewInset />
      </View>
    </View>
  );
}
