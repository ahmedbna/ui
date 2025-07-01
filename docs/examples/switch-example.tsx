// registry/examples/switch-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { SwitchColors } from '@/docs/demo/switch/switch-colors';
import { SwitchDemo } from '@/docs/demo/switch/switch-demo';
import { SwitchDisabled } from '@/docs/demo/switch/switch-disabled';
import { SwitchError } from '@/docs/demo/switch/switch-error';
import { SwitchSettings } from '@/docs/demo/switch/switch-settings';
import { SwitchSimple } from '@/docs/demo/switch/switch-simple';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
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

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <SwitchDemo />
      </View>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Without Label
        </Text>
        <SwitchSimple />
      </View>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Error State
        </Text>
        <SwitchError />
      </View>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled State
        </Text>
        <SwitchDisabled />
      </View>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Settings List
        </Text>
        <SwitchSettings />
      </View>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Colors
        </Text>
        <SwitchColors />
      </View>
    </View>
  );
}
