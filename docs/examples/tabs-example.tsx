// docs/examples/tabs-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { TabsDemo } from '@/docs/demo/tabs/tabs-demo';
import { TabsVertical } from '@/docs/demo/tabs/tabs-vertical';
import { TabsDisabled } from '@/docs/demo/tabs/tabs-disabled';
import { TabsStyled } from '@/docs/demo/tabs/tabs-styled';

// Main demo screen combining all tab examples
export function TabsExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Tabs
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default Tabs
        </Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Basic horizontal tabs with three panels
        </Text>
        <TabsDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Vertical Orientation
        </Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Tabs arranged vertically for sidebar-style navigation
        </Text>
        <TabsVertical />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled States
        </Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Some tabs can be disabled to prevent interaction
        </Text>
        <TabsDisabled />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Tabs with custom colors, shadows, and themed content areas
        </Text>
        <TabsStyled />
      </View>
    </View>
  );
}
