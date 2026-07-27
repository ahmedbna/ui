import { showConfirmAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

export function AlertConfirmDemo() {
  const handleConfirmAlert = () => {
    showConfirmAlert(
      'Confirm Action',
      'Are you sure you want to proceed with this action?',
      () => console.log('Action confirmed'),
      () => console.log('Action cancelled')
    );
  };

  return (
    <Button onPress={handleConfirmAlert} variant='success'>
      Show Confirm Alert
    </Button>
  );
}
