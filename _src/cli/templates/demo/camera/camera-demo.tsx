import { Camera } from '@/components/ui/camera';
import React from 'react';
import { Alert } from 'react-native';

export function CameraDemo() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Picture Captured', `Saved to: ${uri}`);
  };

  const handleVideoCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Video Recorded', `Saved to: ${uri}`);
  };

  return (
    <Camera
      onCapture={handleCapture}
      onVideoCapture={handleVideoCapture}
      style={{ height: 400 }}
    />
  );
}
