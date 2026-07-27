import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { SwitchColors } from '@/demo/switch/switch-colors';

// Main demo screen combining all demo
export function SwitchExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Switch
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 18 }}>
          Default
        </Text>
        <SwitchDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 18 }}>
          Without Label
        </Text>
        <SwitchSimple />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 18 }}>
          With Error State
        </Text>
        <SwitchError />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 18 }}>
          Disabled State
        </Text>
        <SwitchDisabled />
      </View> */}
      {/* 
      <View>
        <Text variant='title' style={{ marginBottom: 18 }}>
          Settings List
        </Text>
        <SwitchSettings />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 18 }}>
          Custom Colors
        </Text>
        <SwitchColors />
      </View>
    </View>
  );
}
