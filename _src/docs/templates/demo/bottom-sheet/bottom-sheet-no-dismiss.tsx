import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BottomSheetNoDismiss() {
  const { isVisible, open, close } = useBottomSheet();

  return (
    <View>
      <Button onPress={open}>Important Action</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title='Confirm Action'
        snapPoints={[0.4]}
        enableBackdropDismiss={false}
      >
        <View style={{ gap: 16 }}>
          <Text>
            This bottom sheet cannot be dismissed by tapping the backdrop. You
            must use one of the action buttons below.
          </Text>
          <Text variant='caption' style={{ fontStyle: 'italic' }}>
            This is useful for critical confirmations or required actions.
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
            <Button variant='outline' onPress={close} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button variant='destructive' onPress={close} style={{ flex: 1 }}>
              Confirm
            </Button>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
