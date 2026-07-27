import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import React from 'react';

export function AccordionFAQ() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='shipping'>
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Standard shipping typically takes 3-5 business days. Express
            shipping is available for 1-2 business days delivery.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='returns'>
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          <Text>
            We offer a 30-day return policy for all items in original condition.
            Return shipping is free for defective items.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='warranty'>
        <AccordionTrigger>Do you offer warranty?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Yes, all products come with a 1-year manufacturer warranty. Extended
            warranty options are available at checkout.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='support'>
        <AccordionTrigger>How can I contact support?</AccordionTrigger>
        <AccordionContent>
          <Text>
            You can reach our support team via email at support@example.com or
            through our live chat feature available 24/7.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
