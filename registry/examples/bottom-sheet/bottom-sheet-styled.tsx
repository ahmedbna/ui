import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

export function BottomSheetStyled() {
  const { isVisible, open, close } = useBottomSheet();
  const accentColor = useThemeColor({}, 'blue');

  return (
    <View>
      <Button onPress={open}>Styled Sheet</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title='Custom Styling'
        snapPoints={[0.5, 0.8]}
        style={{
          borderTopWidth: 3,
          borderTopColor: accentColor,
        }}
      >
        <View style={{ gap: 16 }}>
          <View
            style={{
              backgroundColor: accentColor + '20',
              padding: 16,
              borderRadius: 12,
            }}
          >
            <Text variant='title' style={{ color: accentColor }}>
              Premium Feature
            </Text>
            <Text style={{ marginTop: 8 }}>
              This bottom sheet has custom styling including a colored border
              and accent-colored content areas.
            </Text>
          </View>

          <Button variant='success' onPress={close}>
            Get Started
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
}
