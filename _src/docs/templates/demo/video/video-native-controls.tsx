import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoNativeControls() {
  return (
    <Video
      source={{
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      }}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 8,
      }}
      nativeControls={true}
      autoPlay={false}
      loop={false}
    />
  );
}
