import { createThreeButtonAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

export function AlertThreeButtonDemo() {
  const handleThreeButtonAlert = () => {
    createThreeButtonAlert({
      title: 'Three Button Alert',
      message: 'This is a three-button alert example',
      buttons: [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
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

  return (
    <Button onPress={handleThreeButtonAlert} variant='outline'>
      Show Three Button Alert
    </Button>
  );
}
