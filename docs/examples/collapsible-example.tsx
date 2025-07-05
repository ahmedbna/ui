import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { CollapsibleDemo } from '@/docs/demo/collapsible/collapsible-demo';
import { CollapsibleFAQ } from '@/docs/demo/collapsible/collapsible-faq';
import { CollapsibleMultiple } from '@/docs/demo/collapsible/collapsible-multiple';
import { CollapsibleNested } from '@/docs/demo/collapsible/collapsible-nested';
import { CollapsibleWithContent } from '@/docs/demo/collapsible/collapsible-with-content';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all collapsible demo
export function CollapsibleExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Collapsible
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <CollapsibleDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Multiple Collapsibles
        </Text>
        <CollapsibleMultiple />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Nested Collapsibles
        </Text>
        <CollapsibleNested />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Interactive Content
        </Text>
        <CollapsibleWithContent />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          FAQ Style
        </Text>
        <CollapsibleFAQ />
      </View>
    </View>
  );
}
