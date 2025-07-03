import { Camera } from '@/components/ui/camera';
import React from 'react';
import { Alert } from 'react-native';

export function CameraVideo() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert(
      'Picture Taken',
      `Saved: ${uri.substring(uri.lastIndexOf('/') + 1)}`
    );
  };

  const handleVideoCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Video Recorded', `Duration: ${uri ? 'Success' : 'Failed'}`);
  };

  return (
    <Camera
      maxVideoDuration={120}
      onCapture={handleCapture}
      onVideoCapture={handleVideoCapture}
      style={{ height: 400 }}
    />
  );
}
