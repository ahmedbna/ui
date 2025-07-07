import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import React from 'react';

export function AccordionSingle() {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>What is React Native?</AccordionTrigger>
        <AccordionContent>
          <Text>
            React Native is a framework for building native mobile applications
            using React. It allows you to create mobile apps for iOS and Android
            using JavaScript and React components.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>What is Expo?</AccordionTrigger>
        <AccordionContent>
          <Text>
            Expo is a platform for making universal native apps that run on
            Android, iOS, and the web. It provides a set of tools and services
            built around React Native.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          <Text>
            TypeScript is a programming language developed by Microsoft. It is a
            strict syntactical superset of JavaScript and adds optional static
            type checking to the language.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
