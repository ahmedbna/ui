import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import React from 'react';

export function AccordionMultiple() {
  return (
    <Accordion type='multiple' defaultValue={['item-1', 'item-2']}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Frontend Technologies</AccordionTrigger>
        <AccordionContent>
          <Text>
            Modern frontend development includes React, Vue, Angular, and many
            other frameworks that help build interactive user interfaces.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>Backend Technologies</AccordionTrigger>
        <AccordionContent>
          <Text>
            Backend development involves server-side technologies like Node.js,
            Python, Java, and databases to handle data and business logic.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>Mobile Development</AccordionTrigger>
        <AccordionContent>
          <Text>
            Mobile development can be done natively with Swift/Kotlin or with
            cross-platform solutions like React Native, Flutter, or Xamarin.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-4'>
        <AccordionTrigger>DevOps & Cloud</AccordionTrigger>
        <AccordionContent>
          <Text>
            DevOps practices and cloud platforms like AWS, Azure, and GCP help
            deploy, scale, and maintain applications efficiently.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
