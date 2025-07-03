import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastMultiple() {
  const { toast, dismissAll } = useToast();

  const showMultipleToasts = () => {
    const variants = ['success', 'warning', 'error', 'info'] as const;
    const messages = [
      { title: 'Success!', description: 'Operation completed successfully' },
      { title: 'Warning', description: 'Please check your input' },
      { title: 'Error', description: 'Something went wrong' },
      { title: 'Info', description: "Here's some information" },
    ];

    variants.forEach((variant, index) => {
      setTimeout(() => {
        toast({
          ...messages[index],
          variant,
          duration: 6000,
        });
      }, index * 500); // Stagger the toasts
    });
  };

  const showBatchToasts = () => {
    // Show multiple toasts at once
    toast({
      title: 'First toast',
      description: 'This is the first toast',
      variant: 'success',
    });

    toast({
      title: 'Second toast',
      description: 'This is the second toast',
      variant: 'info',
    });

    toast({
      title: 'Third toast',
      description: 'This is the third toast',
      variant: 'warning',
    });
  };

  return (
    <View style={{ gap: 12 }}>
      <Button onPress={showMultipleToasts} variant='outline'>
        Show Staggered Toasts
      </Button>

      <Button onPress={showBatchToasts} variant='outline'>
        Show Batch Toasts
      </Button>

      <Button onPress={dismissAll} variant='destructive'>
        Dismiss All Toasts
      </Button>
    </View>
  );
}
