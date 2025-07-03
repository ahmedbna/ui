import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoAutoplayLoop() {
  return (
    <Video
      source={{
        uri: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
