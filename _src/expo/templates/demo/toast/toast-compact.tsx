import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastCompact() {
  const { toast } = useToast();

  return (
    <View style={{ gap: 12 }}>
      <Button
        onPress={() =>
          toast({
            variant: 'success',
          })
        }
        variant='success'
      >
        Success Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            variant: 'error',
          })
        }
        variant='destructive'
      >
        Error Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            variant: 'warning',
          })
        }
        variant='secondary'
      >
        Warning Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            variant: 'info',
          })
        }
        variant='outline'
      >
        Info Icon Only
      </Button>

      <Button
        onPress={() =>
          toast({
            title: 'Title only',
          })
        }
      >
        Title Only
      </Button>
    </View>
  );
}
