import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function AlertVisualDestructiveDemo() {
  return (
    <View>
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
    </View>
  );
}
