import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BottomSheetSnapPoints() {
  const { isVisible, open, close } = useBottomSheet();

  return (
    <View>
      <Button onPress={open}>Custom Snap Points</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title='Custom Heights'
        snapPoints={[0.2, 0.5, 0.8, 0.95]}
      >
        <View style={{ gap: 16 }}>
          <Text variant='title'>Multiple Snap Points</Text>
          <Text>
            This sheet has four different snap points: 20%, 50%, 80%, and 95% of
            screen height. Try dragging to see how it snaps to each position.
          </Text>
          <View style={{ gap: 12 }}>
            <Text variant='body'>Available heights:</Text>
            <Text>• 20% - Peek view</Text>
            <Text>• 50% - Medium height</Text>
            <Text>• 80% - Large view</Text>
            <Text>• 95% - Nearly fullscreen</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
