import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

export function PopoverCustom() {
  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'muted');

  return (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Custom Styled</Button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor: primaryColor,
            borderRadius: 16,
            maxWidth: 250,
          }}
        >
          <PopoverBody style={{ padding: 20 }}>
            <Text style={{ color: 'black', textAlign: 'center' }}>
              This popover has custom styling with primary color background
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>Large Content</Button>
        </PopoverTrigger>
        <PopoverContent
          maxWidth={400}
          maxHeight={300}
          style={{
            backgroundColor: mutedColor,
          }}
        >
          <PopoverBody style={{ padding: 24 }}>
            <Text variant='title' style={{ marginBottom: 12 }}>
              Large Popover Content
            </Text>
            <Text style={{ lineHeight: 20 }}>
              This popover has custom dimensions and can hold more content. It
              demonstrates how you can customize the appearance and size of
              popover components to fit your design needs.
            </Text>
            <Text style={{ marginTop: 12, fontStyle: 'italic' }}>
              The content area is scrollable if it exceeds the maximum height.
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button size='icon'>?</Button>
        </PopoverTrigger>
        <PopoverContent side='top' align='center'>
          <PopoverBody>
            <Text style={{ textAlign: 'center' }}>
              This is a help tooltip using a custom circular trigger button
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </View>
  );
}
