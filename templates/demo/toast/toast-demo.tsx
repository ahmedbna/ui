import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import React from 'react';

export function ToastDemo() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: 'Toast Notification',
      description:
        'This is a basic toast notification with title and description.',
      variant: 'default',
    });
  };

  return <Button onPress={showToast}>Show Toast</Button>;
}
