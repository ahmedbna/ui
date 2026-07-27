import { showErrorAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

export function AlertErrorDemo() {
  const handleErrorAlert = () => {
    showErrorAlert('Error', 'Something went wrong. Please try again.', () =>
      console.log('Error acknowledged')
    );
  };

  return (
    <Button onPress={handleErrorAlert} variant='destructive'>
      Show Error Alert
    </Button>
  );
}
