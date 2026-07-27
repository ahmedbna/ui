import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { AccordionStyled } from '@/demo/accordion/accordion-styled';
import React from 'react';

// Main demo screen combining all demo
export function AccordionExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <View>
        <Text variant='heading' style={{ marginBottom: 16 }}>
          Accordion
        </Text>

        <View style={{ gap: 24 }}>
          {/* <View>
            <Text variant='title' style={{ marginBottom: 12 }}>
              Default (Single, Collapsible)
            </Text>
            <AccordionDemo />
          </View> */}

          {/* <View>
            <Text variant='title' style={{ marginBottom: 12 }}>
              Multiple Selection
            </Text>
            <AccordionMultiple />
          </View> */}

          {/* <View>
            <Text variant='title' style={{ marginBottom: 12 }}>
              Controlled State
            </Text>
            <AccordionControlled />
          </View> */}

          {/* <View>
            <Text variant='title' style={{ marginBottom: 12 }}>
              FAQ Style
            </Text>
            <AccordionFAQ />
          </View> */}

          {/* <View>
            <Text variant='title' style={{ marginBottom: 12 }}>
              Non-Collapsible (Always One Open)
            </Text>
            <AccordionNonCollapsible />
          </View> */}

          <View>
            <Text variant='title' style={{ marginBottom: 12 }}>
              Custom Styled
            </Text>
            <AccordionStyled />
          </View>
        </View>
      </View>
    </View>
  );
}
