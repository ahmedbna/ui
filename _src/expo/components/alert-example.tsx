// Example usage of the Alert components
import {
  Alert,
  AlertDescription,
  AlertTitle,
  createThreeButtonAlert,
  createTwoButtonAlert,
  showConfirmAlert,
  showErrorAlert,
  showNativeAlert,
  showSuccessAlert,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { ScrollView } from 'react-native';

export function AlertExamples() {
  // Native alert demo
  const handleTwoButtonAlert = () => {
    createTwoButtonAlert({
      title: 'Two Button Alert',
      message: 'This is a two-button alert example',
      buttons: [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
    });
  };

  const handleThreeButtonAlert = () => {
    createThreeButtonAlert({
      title: 'Three Button Alert',
      message: 'This is a three-button alert example',
      buttons: [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
    });
  };

  const handleCustomAlert = () => {
    showNativeAlert({
      title: 'Custom Alert',
      message: 'This is a custom native alert with multiple options',
      buttons: [
        {
          text: 'Option 1',
          onPress: () => console.log('Option 1 selected'),
        },
        {
          text: 'Option 2',
          onPress: () => console.log('Option 2 selected'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
          style: 'cancel',
        },
      ],
    });
  };

  const handleSuccessAlert = () => {
    showSuccessAlert(
      'Success!',
      'Your action was completed successfully.',
      () => console.log('Success acknowledged')
    );
  };

  const handleErrorAlert = () => {
    showErrorAlert('Error', 'Something went wrong. Please try again.', () =>
      console.log('Error acknowledged')
    );
  };

  const handleConfirmAlert = () => {
    showConfirmAlert(
      'Confirm Action',
      'Are you sure you want to proceed with this action?',
      () => console.log('Action confirmed'),
      () => console.log('Action cancelled')
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text variant='heading' style={{ marginBottom: 24 }}>
        Alert demo
      </Text>

      {/* Native Alerts */}
      <Text variant='title' style={{ marginBottom: 16 }}>
        Native Alerts
      </Text>

      <View style={{ gap: 12, marginBottom: 24 }}>
        <Button onPress={handleTwoButtonAlert}>Show Two Button Alert</Button>

        <Button onPress={handleThreeButtonAlert} variant='outline'>
          Show Three Button Alert
        </Button>

        <Button onPress={handleCustomAlert}>Show Custom Alert</Button>

        <Button onPress={handleSuccessAlert} variant='secondary'>
          Show Success Alert
        </Button>

        <Button onPress={handleErrorAlert} variant='destructive'>
          Show Error Alert
        </Button>

        <Button onPress={handleConfirmAlert} variant='success'>
          Show Confirm Alert
        </Button>
      </View>

      {/* Visual Alerts */}
      <Text variant='title' style={{ marginBottom: 16 }}>
        Visual Alerts
      </Text>

      <Alert style={{ marginBottom: 16 }}>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default visual alert that appears inline with your content.
        </AlertDescription>
      </Alert>

      <Alert variant='destructive' style={{ marginBottom: 24 }}>
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive visual alert for error messages.
        </AlertDescription>
      </Alert>

      <Text variant='caption' style={{ marginTop: 16 }}>
        Visual alerts appear inline with your content, while native alerts
        appear as system dialogs on top of your app.
      </Text>
    </ScrollView>
  );
}
