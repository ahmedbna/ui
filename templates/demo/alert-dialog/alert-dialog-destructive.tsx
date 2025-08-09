import React from 'react';
import { Dialog, useDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';

export default function AlertDialogDestructiveDemo() {
  const dialog = useDialog();

  return (
    <View style={{ padding: 20 }}>
      <Button variant="destructive" onPress={dialog.open}>
        Delete Item
      </Button>

      <Dialog
        isVisible={dialog.isVisible}
        onClose={dialog.close}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          console.log('Item deleted');
          dialog.close();
        }}
        onCancel={dialog.close}
      />
    </View>
  );
}