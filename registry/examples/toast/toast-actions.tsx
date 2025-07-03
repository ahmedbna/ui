import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastActions() {
  const { toast } = useToast();

  const showToastWithAction = () => {
    toast({
      title: 'New message received',
      description: 'You have a new message from John Doe.',
      variant: 'info',
      action: {
        label: 'View',
        onPress: () => {
          console.log('View action pressed');
          // Navigate to message or perform action
        },
      },
    });
  };

  const showUndoToast = () => {
    toast({
      title: 'Item deleted',
      description: 'The item has been removed from your list.',
      variant: 'warning',
      duration: 8000, // Longer duration for undo action
      action: {
        label: 'Undo',
        onPress: () => {
          console.log('Undo action pressed');
          // Restore the deleted item
        },
      },
    });
  };

  return (
    <View style={{ gap: 12 }}>
      <Button onPress={showToastWithAction} variant='outline'>
        Show with Action
      </Button>

      <Button onPress={showUndoToast} variant='outline'>
        Show Undo Toast
      </Button>
    </View>
  );
}
