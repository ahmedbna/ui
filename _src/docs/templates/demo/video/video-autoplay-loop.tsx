import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoAutoplayLoop() {
  return (
    <Video
      source={{
        uri: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/',
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
