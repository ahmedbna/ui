import { showNativeAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

export function AlertCustomDemo() {
  const handleCustomAlert = () => {
    showNativeAlert({
      title: 'Custom Alert',
      message: 'This is a custom native alert with multiple options',
      buttons: [
        {
          text: 'Option 1',
          onPress: () => console.log('Option 1 selected'),
        },
        {
          text: 'Option 2',
          onPress: () => console.log('Option 2 selected'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        },
      ],
    });
  };

  return <Button onPress={handleCustomAlert}>Show Custom Alert</Button>;
}
