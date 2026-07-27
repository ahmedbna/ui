import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

import { AlertAdvancedDemo } from '@/demo/alert/alert-advanced-demo';

export function AlertExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Alert
      </Text>

      {/* <View>
        <Text variant='title'>Default Visual Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Standard inline alert for general information
        </Text>
        <AlertVisualDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Destructive Visual Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Error alert with destructive styling
        </Text>
        <AlertVisualDestructiveDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Two Button Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Basic alert with Cancel and OK options
        </Text>
        <AlertDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Three Button Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Alert with multiple action options
        </Text>
        <AlertThreeButtonDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Success Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Positive feedback for completed actions
        </Text>
        <AlertSuccessDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Error Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Error messaging with destructive button styling
        </Text>
        <AlertErrorDemo />
      </View> */}
      {/* 
      <View>
        <Text variant='title'>Confirmation Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Confirm important or destructive actions
        </Text>
        <AlertConfirmDemo />
      </View> */}

      {/* <View>
        <Text variant='title'>Custom Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Fully customizable alert with multiple options
        </Text>
        <AlertCustomDemo />
      </View> */}

      <View>
        <Text variant='title'>Advanced Alert</Text>
        <Text variant='caption' style={{ marginBottom: 16 }}>
          Fully customizable alert with multiple options
        </Text>
        <AlertAdvancedDemo />
      </View>
    </View>
  );
}
