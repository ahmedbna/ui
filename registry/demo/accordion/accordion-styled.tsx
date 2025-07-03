import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function AccordionStyled() {
  const card = useThemeColor({}, 'card');

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: card,
        borderRadius: BORDER_RADIUS,
      }}
    >
      <Accordion type='single' collapsible>
        <AccordionItem value='features'>
          <AccordionTrigger>🚀 Features</AccordionTrigger>
          <AccordionContent style={{ paddingLeft: 8 }}>
            <Text>
              • Cross-platform compatibility{'\n'}• TypeScript support{'\n'}•
              Theme system integration{'\n'}• Customizable animations
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='performance'>
          <AccordionTrigger>⚡ Performance</AccordionTrigger>
          <AccordionContent style={{ paddingLeft: 8 }}>
            <Text>
              • Optimized rendering{'\n'}• Minimal re-renders{'\n'}• Smooth
              animations{'\n'}• Memory efficient
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='accessibility'>
          <AccordionTrigger>♿ Accessibility</AccordionTrigger>
          <AccordionContent style={{ paddingLeft: 8 }}>
            <Text>
              • Screen reader support{'\n'}• Keyboard navigation{'\n'}• Focus
              management{'\n'}• ARIA attributes
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
