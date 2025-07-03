import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoCustomControls() {
  return (
    <Video
      source={{
        uri: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
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
