import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BottomSheetTitle() {
  const { isVisible, open, close } = useBottomSheet();

  return (
    <View>
      <Button onPress={open}>Open Sheet with Title</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title='Settings'
        snapPoints={[0.4, 0.7]}
      >
        <View style={{ gap: 16 }}>
          <Text>
            This bottom sheet includes a title in the header area. The title is
            centered and uses the theme's title text style.
          </Text>
          <Button variant='secondary' onPress={close}>
            Done
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
}
