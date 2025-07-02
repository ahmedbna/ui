// registry/examples/video-autoplay-loop.tsx
import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoAutoplayLoop() {
  return (
    <Video
      source={{
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      style={{
        width: '100%',
        height: 180,
        borderRadius: 8,
      }}
      autoPlay={true}
      loop={true}
      muted={true}
      showControls={true}
      contentFit='cover'
    />
  );
}
