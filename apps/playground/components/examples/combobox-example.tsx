import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ComboboxLarge } from '@/demo/combobox/combobox-large';
import React from 'react';

// Main demo screen combining all demo
export function ComboboxExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 200,
        // justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Combobox
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <ComboboxDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Groups
        </Text>
        <ComboboxGroups />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Multiple Selection
        </Text>
        <ComboboxMultiple />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Disabled State
        </Text>
        <ComboboxDisabled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Search
        </Text>
        <ComboboxSearch />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Form Integration
        </Text>
        <ComboboxForm />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Large Dataset
        </Text>
        <ComboboxLarge />
      </View>
    </View>
  );
}
