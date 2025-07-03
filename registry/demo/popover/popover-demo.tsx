import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import React from 'react';

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <Text variant='title'>Popover Title</Text>
        </PopoverHeader>
        <PopoverBody>
          <Text>
            This is the popover content. You can put any content here.
          </Text>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose>
            <Button variant='outline' size='sm'>
              Close
            </Button>
          </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
