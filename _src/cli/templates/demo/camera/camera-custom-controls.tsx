import { Camera } from '@/components/ui/camera';
import React from 'react';
import { Alert } from 'react-native';

export function CameraCustomControls() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Capture Complete', `${type} saved successfully`);
  };

  const handleVideoCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Recording Complete', `Video saved successfully`);
  };

  return (
    <Camera
      facing='front'
      enableTorch={false}
      timerOptions={[0, 5, 15]}
      maxVideoDuration={30}
      onCapture={handleCapture}
      onVideoCapture={handleVideoCapture}
      style={{ height: 400, borderRadius: 12 }}
    />
  );
}
