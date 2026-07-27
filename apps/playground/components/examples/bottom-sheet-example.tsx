// docs/demo/bottom-sheet-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BottomSheetForm } from '@/demo/bottom-sheet/bottom-sheet-form';

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
