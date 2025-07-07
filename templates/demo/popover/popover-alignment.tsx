import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function PopoverAlignment() {
  return (
    <View style={{ gap: 24, alignItems: 'center' }}>
      <View style={{ gap: 16 }}>
        <Text variant='title'>Bottom Side Alignment</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Start</Button>
            </PopoverTrigger>
            <PopoverContent side='bottom' align='start'>
              <PopoverBody>
                <Text>Aligned to start (left)</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button>Center</Button>
            </PopoverTrigger>
            <PopoverContent side='bottom' align='center'>
              <PopoverBody>
                <Text>Aligned to center</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button>End</Button>
            </PopoverTrigger>
            <PopoverContent side='bottom' align='end'>
              <PopoverBody>
                <Text>Aligned to end (right)</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <Text variant='title'>Right Side Alignment</Text>
        <View style={{ gap: 16 }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Start</Button>
            </PopoverTrigger>
            <PopoverContent side='right' align='start'>
              <PopoverBody>
                <Text>Aligned to start (top)</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button>Center</Button>
            </PopoverTrigger>
            <PopoverContent side='right' align='center'>
              <PopoverBody>
                <Text>Aligned to center</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button>End</Button>
            </PopoverTrigger>
            <PopoverContent side='right' align='end'>
              <PopoverBody>
                <Text>Aligned to end (bottom)</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </View>
      </View>
    </View>
  );
}
