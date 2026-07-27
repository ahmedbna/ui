import { showSuccessAlert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import React from 'react';

export function AlertSuccessDemo() {
  const handleSuccessAlert = () => {
    showSuccessAlert(
      'Success!',
      'Your action was completed successfully.',
      () => console.log('Success acknowledged')
    );
  };

  return (
    <Button onPress={handleSuccessAlert} variant='secondary'>
      Show Success Alert
    </Button>
  );
}
