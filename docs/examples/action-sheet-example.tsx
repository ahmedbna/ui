// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

import { ActionSheetDestructive } from '@/docs/demo/action-sheet/action-sheet-destructive';
import { ActionSheetDisabled } from '@/docs/demo/action-sheet/action-sheet-disabled';
import { ActionSheetHook } from '@/docs/demo/action-sheet/action-sheet-hook';
import { ActionSheetIcons } from '@/docs/demo/action-sheet/action-sheet-icons';
import { ActionSheetLong } from '@/docs/demo/action-sheet/action-sheet-long';
import { ActionSheetStyled } from '@/docs/demo/action-sheet/action-sheet-styled';
import { ActionSheetDemo } from '@/docs/demo/action-sheet/action-sheet-demo';

// Main demo screen combining all demo
export function ActionSheetExammple() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Action Sheet
      </Text>

      {/* <View>
        <Text variant='title'>Default</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Basic action sheet with multiple options
        </Text>

        <ActionSheetDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>With Icons (Andriod Only)</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Action sheet with icons for better visual hierarchy
        </Text>
        <ActionSheetIcons />
      </View> */}

      {/* <View>
        <Text variant='title'>Destructive Actions</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Highlighting destructive actions with red styling
        </Text>
        <ActionSheetDestructive />
      </View> */}

      {/* <View>
        <Text variant='title'>Disabled Options</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Some options can be disabled based on context
        </Text>
        <ActionSheetDisabled />
      </View> */}

      {/* <View>
        <Text variant='title'>Custom Styling</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Customized appearance with different styling
        </Text>
        <ActionSheetStyled />
      </View> */}

      {/* <View>
        <Text variant='title'>Long Options List</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Scrollable list when there are many options
        </Text>
        <ActionSheetLong />
      </View> */}

      <View>
        <Text variant='title'>Using Hook</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Simplified usage with the useActionSheet hook
        </Text>
        <ActionSheetHook />
      </View>
    </View>
  );
}
