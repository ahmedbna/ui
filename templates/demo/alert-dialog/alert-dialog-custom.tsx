import React from 'react';
import { AlertDialog, useAlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';

export default function AlertDialogCustomDemo() {
  const dialog = useAlertDialog();

  return (
    <View style={{ padding: 20 }}>
      <Button variant="outline" onPress={dialog.open}>
        Custom Dialog
      </Button>

      <AlertDialog
        isVisible={dialog.isVisible}
        onClose={dialog.close}
        confirmText="Continue"
        cancelText="Go Back"
        onConfirm={() => {
          console.log('Continued');
          dialog.close();
        }}
        onCancel={dialog.close}
        style={{ borderRadius: 24 }}
      >
        <View style={{ alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
            Custom Content
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 16 }}>
            This dialog contains custom content instead of using the title and description props.
          </Text>
        </View>
      </AlertDialog>
    </View>
  );
}