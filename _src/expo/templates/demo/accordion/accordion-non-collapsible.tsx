import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import React from 'react';

export function AccordionNonCollapsible() {
  return (
    <Accordion type='single' defaultValue='step-1'>
      <AccordionItem value='step-1'>
        <AccordionTrigger>Step 1: Planning</AccordionTrigger>
        <AccordionContent>
          <Text>
            Start by defining your project requirements and creating a detailed
            plan. This includes wireframing and technical specifications.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='step-2'>
        <AccordionTrigger>Step 2: Development</AccordionTrigger>
        <AccordionContent>
          <Text>
            Begin the development process by setting up your environment and
            implementing the core features according to your plan.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='step-3'>
        <AccordionTrigger>Step 3: Testing</AccordionTrigger>
        <AccordionContent>
          <Text>
            Thoroughly test your application across different devices and
            scenarios to ensure it works as expected.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='step-4'>
        <AccordionTrigger>Step 4: Deployment</AccordionTrigger>
        <AccordionContent>
          <Text>
            Deploy your application to production and monitor its performance.
            Set up analytics and error tracking.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
