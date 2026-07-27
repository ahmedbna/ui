import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function PopoverControlled() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button
          variant={isOpen ? 'default' : 'outline'}
          onPress={() => setIsOpen(true)}
        >
          Open
        </Button>
        <Button
          variant={!isOpen ? 'default' : 'outline'}
          onPress={() => setIsOpen(false)}
        >
          Close
        </Button>
      </View>

      <Text>Status: {isOpen ? 'Open' : 'Closed'}</Text>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button>Controlled Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <Text variant='title'>Controlled Popover</Text>
          </PopoverHeader>
          <PopoverBody>
            <Text>
              This popover's state is controlled externally. You can open and
              close it using the buttons above or by clicking the trigger.
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </View>
  );
}
