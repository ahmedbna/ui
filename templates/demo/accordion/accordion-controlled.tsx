import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function AccordionControlled() {
  const [value, setValue] = React.useState<string | string[]>('');

  return (
    <View>
      <Text variant='caption' style={{ marginBottom: 12 }}>
        Currently open: {value || 'None'}
      </Text>
      <Accordion
        type='single'
        collapsible
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem value='settings'>
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>
            <Text>
              Configure your application preferences, notifications, and account
              settings here.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='privacy'>
          <AccordionTrigger>Privacy</AccordionTrigger>
          <AccordionContent>
            <Text>
              Manage your privacy settings, data sharing preferences, and
              visibility controls.
            </Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='security'>
          <AccordionTrigger>Security</AccordionTrigger>
          <AccordionContent>
            <Text>
              Set up two-factor authentication, change passwords, and review
              security logs.
            </Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
