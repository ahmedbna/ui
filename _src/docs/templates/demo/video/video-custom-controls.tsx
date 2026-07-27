import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoCustomControls() {
  return (
    <Video
      source={{
        uri: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/',
      }}
      style={{
        width: '100%',
        height: 250,
        borderRadius: 12,
      }}
      nativeControls={false}
      showControls={true}
      autoPlay={false}
      loop={true}
      seekBy={5}
      onPlaybackStatusUpdate={(status) => {
        console.log('Playback status:', status);
      }}
      onLoad={() => {
        console.log('Video loaded successfully');
      }}
    />
  );
}
