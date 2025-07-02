import { Camera } from '@/components/ui/camera';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { Alert } from 'react-native';

export function CameraZoom() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Zoomed Capture', 'Photo taken with current zoom level');
  };

  return (
    <View style={{ gap: 8 }}>
      <Text variant='body' style={{ textAlign: 'center', opacity: 0.7 }}>
        Pinch to zoom • Double tap for quick zoom • Tap zoom button to cycle
        levels
      </Text>
      <Camera onCapture={handleCapture} style={{ height: 400 }} />
    </View>
  );
}
