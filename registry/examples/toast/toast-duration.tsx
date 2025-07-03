import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastDuration() {
  const { toast } = useToast();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Button
        onPress={() =>
          toast({
            title: 'Quick toast',
            description: 'This disappears in 2 seconds',
            duration: 2000,
            variant: 'info',
          })
        }
        variant='outline'
      >
        2 seconds
      </Button>

      <Button
        onPress={() =>
          toast({
            title: 'Standard toast',
            description: 'This disappears in 4 seconds',
            duration: 4000,
            variant: 'default',
          })
        }
        variant='outline'
      >
        4 seconds (default)
      </Button>

      <Button
        onPress={() =>
          toast({
            title: 'Long toast',
            description: 'This disappears in 8 seconds',
            duration: 8000,
            variant: 'warning',
          })
        }
        variant='outline'
      >
        8 seconds
      </Button>

      <Button
        onPress={() =>
          toast({
            title: 'Persistent toast',
            description: "This won't disappear automatically",
            duration: 0, // No auto-dismiss
            variant: 'error',
          })
        }
        variant='outline'
      >
        Persistent
      </Button>
    </View>
  );
}
