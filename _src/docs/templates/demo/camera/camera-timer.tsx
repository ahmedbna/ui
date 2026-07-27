import { Camera } from '@/components/ui/camera';
import React from 'react';
import { Alert } from 'react-native';

export function CameraTimer() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Timer Capture', 'Photo captured after countdown!');
  };

  const handleVideoCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Timer Recording', 'Video started after countdown!');
  };

  return (
    <Camera
      timerOptions={[0, 3, 5, 10, 15]}
      onCapture={handleCapture}
      onVideoCapture={handleVideoCapture}
      style={{ height: 400 }}
    />
  );
}
