// docs/demo/bottom-sheet-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BottomSheetDemo } from '@/docs/examples/bottom-sheet/bottom-sheet-demo';
import { BottomSheetForm } from '@/docs/examples/bottom-sheet/bottom-sheet-form';
import { BottomSheetList } from '@/docs/examples/bottom-sheet/bottom-sheet-list';
import { BottomSheetMenu } from '@/docs/examples/bottom-sheet/bottom-sheet-menu';
import { BottomSheetNoDismiss } from '@/docs/examples/bottom-sheet/bottom-sheet-no-dismiss';
import { BottomSheetSnapPoints } from '@/docs/examples/bottom-sheet/bottom-sheet-snap-points';
import { BottomSheetStyled } from '@/docs/examples/bottom-sheet/bottom-sheet-styled';
import { BottomSheetTitle } from '@/docs/examples/bottom-sheet/bottom-sheet-title';

// Main demo screen combining all demo
export function BottomSheetExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Bottom Sheet
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <BottomSheetDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Title
        </Text>
        <BottomSheetTitle />
      </View> */}
      {/* 
      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Snap Points
        </Text>
        <BottomSheetSnapPoints />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Form Content
        </Text>
        <BottomSheetForm />
      </View>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          List Content
        </Text>
        <BottomSheetList />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          No Backdrop Dismiss
        </Text>
        <BottomSheetNoDismiss />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <BottomSheetStyled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Menu Options
        </Text>
        <BottomSheetMenu />
      </View> */}
    </View>
  );
}
