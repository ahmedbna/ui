import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BottomSheetDemo() {
  const { isVisible, open, close } = useBottomSheet();

  return (
    <View>
      <Button onPress={open}>Open Bottom Sheet</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        snapPoints={[0.3, 0.6, 0.9]}
      >
        <View style={{ gap: 16 }}>
          <Text variant='title'>Welcome to Bottom Sheet</Text>
          <Text>
            This is a basic bottom sheet that supports gesture interactions. You
            can drag it up and down to different snap points, or swipe down
            quickly to dismiss it.
          </Text>
          <Button onPress={close}>Close</Button>
        </View>
      </BottomSheet>
    </View>
  );
}
