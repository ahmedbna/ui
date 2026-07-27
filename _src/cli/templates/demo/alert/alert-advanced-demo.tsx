import {
  Alert,
  AlertDescription,
  AlertTitle,
  showConfirmAlert,
  showNativeAlert,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function AlertAdvancedDemo() {
  const [showVisualAlert, setShowVisualAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  const handleAsyncOperation = async () => {
    // Show loading state
    setShowVisualAlert(true);
    setAlertType(null);

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success
      setAlertType('success');

      // Auto hide after 3 seconds
      setTimeout(() => {
        setShowVisualAlert(false);
        setAlertType(null);
      }, 3000);
    } catch (error) {
      setAlertType('error');
    }
  };

  const handleDeleteWithConfirmation = () => {
    showConfirmAlert(
      'Delete Item',
      'This action cannot be undone. Are you sure you want to delete this item?',
      () => {
        // First confirmation passed, show second confirmation for critical action
        showConfirmAlert(
          'Final Confirmation',
          'This will permanently delete the item and all associated data. This cannot be undone.',
          () => {
            console.log('Item deleted');
          },
          () => {
            console.log('Delete cancelled at final step');
          }
        );
      },
      () => {
        console.log('Delete cancelled');
      }
    );
  };

  const handleComplexAlert = () => {
    showNativeAlert({
      title: 'Choose Your Action',
      message: 'What would you like to do with this item?',
      buttons: [
        {
          text: 'Edit',
          onPress: () => console.log('Edit selected'),
        },
        {
          text: 'Share',
          onPress: () => console.log('Share selected'),
        },
        {
          text: 'Archive',
          onPress: () => console.log('Archive selected'),
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteWithConfirmation(),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        },
      ],
    });
  };

  return (
    <View style={{ gap: 16 }}>
      {/* Dynamic Visual Alert */}
      {showVisualAlert && (
        <Alert variant={alertType === 'error' ? 'destructive' : 'default'}>
          <AlertTitle>
            {alertType === null && 'Processing...'}
            {alertType === 'success' && 'Success!'}
            {alertType === 'error' && 'Error'}
          </AlertTitle>
          <AlertDescription>
            {alertType === null && 'Please wait while we process your request.'}
            {alertType === 'success' &&
              'Your operation completed successfully.'}
            {alertType === 'error' && 'Something went wrong. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <View style={{ gap: 12 }}>
        <Button onPress={handleAsyncOperation} variant='secondary'>
          Simulate Async Operation
        </Button>

        <Button onPress={handleComplexAlert} variant='outline'>
          Show Complex Alert
        </Button>

        <Button onPress={handleDeleteWithConfirmation} variant='destructive'>
          Delete with Double Confirmation
        </Button>
      </View>

      <Text variant='caption' style={{ opacity: 0.7, marginTop: 8 }}>
        These demo demonstrate advanced patterns like chained confirmations,
        dynamic visual alerts, and complex multi-option native alerts.
      </Text>
    </View>
  );
}
