import React from 'react';
import { AlertDialog, useAlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';

export default function AlertDialogDemo() {
  const dialog = useAlertDialog();

  return (
    <View style={{ padding: 20 }}>
      <Button onPress={dialog.open}>
        Show Dialog
      </Button>

      <AlertDialog
        isVisible={dialog.isVisible}
        onClose={dialog.close}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        confirmText="Yes, delete"
        cancelText="Cancel"
        onConfirm={() => {
          console.log('Account deleted');
          dialog.close();
        }}
        onCancel={dialog.close}
      />
    </View>
  );
}