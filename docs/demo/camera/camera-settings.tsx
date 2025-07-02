import { Camera } from '@/components/ui/camera';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { Alert } from 'react-native';

export function CameraSettings() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Settings Demo', 'Captured with current settings applied');
  };

  const handleVideoCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Settings Demo', 'Recorded with current settings applied');
  };

  return (
    <View style={{ gap: 8 }}>
      <Text variant='body' style={{ textAlign: 'center', opacity: 0.7 }}>
        Tap the settings icon to access grid, sound, aspect ratio, and timer
        controls
      </Text>
      <Camera
        onCapture={handleCapture}
        onVideoCapture={handleVideoCapture}
        style={{ height: 400 }}
      />
    </View>
  );
}
