import { createTwoButtonAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

export function AlertDemo() {
  const handleTwoButtonAlert = () => {
    createTwoButtonAlert({
      title: 'Two Button Alert',
      message: 'This is a two-button alert example',
      buttons: [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
    });
  };

  return <Button onPress={handleTwoButtonAlert}>Show Two Button Alert</Button>;
}
