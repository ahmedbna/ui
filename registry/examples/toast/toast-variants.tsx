import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import React from 'react';

export function ToastVariants() {
  const { success, error, warning, info } = useToast();

  return (
    <View style={{ gap: 12 }}>
      <Button
        onPress={() =>
          success('Success!', 'Your action was completed successfully.')
        }
        variant='success'
      >
        Success
      </Button>

      <Button
        onPress={() =>
          error('Error!', 'Something went wrong. Please try again.')
        }
        variant='destructive'
      >
        Error
      </Button>

      <Button
        onPress={() =>
          warning('Warning!', 'Please review your input before continuing.')
        }
        variant='secondary'
      >
        Warning
      </Button>

      <Button
        onPress={() => info('Info', "Here's some helpful information for you.")}
      >
        Info
      </Button>
    </View>
  );
}
