import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { CheckboxGroup } from '@/templates/demo/checkbox/checkbox-group';
import React from 'react';

// Main demo screen combining all checkbox demo
export function CheckboxExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Checkbox
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <CheckboxDemo />
      </View> */}
      {/* 
      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different States
        </Text>
        <CheckboxStates />
      </View> */}

      {/*  <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Without Label
        </Text>
        <CheckboxWithoutLabel />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Error State
        </Text>
        <CheckboxWithError />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <CheckboxCustomStyling />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Checkbox Group
        </Text>
        <CheckboxGroup />
      </View>
    </View>
  );
}
