import { Camera } from '@/components/ui/camera';
import React from 'react';
import { Alert } from 'react-native';

export function CameraPictureOnly() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Photo Captured', 'Picture saved to gallery');
  };

  return (
    <Camera
      enableVideo={false}
      onCapture={handleCapture}
      style={{ height: 400 }}
    />
  );
}
