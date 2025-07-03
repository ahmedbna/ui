// registry/demo/combobox-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { ComboboxDemo } from '@/docs/examples/combobox/combobox-demo';
import { ComboboxDisabled } from '@/docs/examples/combobox/combobox-disabled';
import { ComboboxForm } from '@/docs/examples/combobox/combobox-form';
import { ComboboxGroups } from '@/docs/examples/combobox/combobox-groups';
import { ComboboxLarge } from '@/docs/examples/combobox/combobox-large';
import { ComboboxMultiple } from '@/docs/examples/combobox/combobox-multiple';
import { ComboboxSearch } from '@/docs/examples/combobox/combobox-search';
import React from 'react';
import { ScrollView } from 'react-native';

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
