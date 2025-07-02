import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import React from 'react';

export function AccordionDemo() {
  return (
    <Accordion type='single' collapsible defaultValue='item-1'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes. It comes with default styles that matches the other components'
            aesthetic.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes. It's animated by default, but you can disable it if you prefer.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
