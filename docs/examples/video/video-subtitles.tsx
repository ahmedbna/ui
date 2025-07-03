import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoSubtitles() {
  const subtitles = [
    { start: 0, end: 3, text: 'Welcome to our video demo' },
    { start: 3, end: 6, text: 'This video shows subtitle support' },
    { start: 6, end: 9, text: 'Subtitles appear at the bottom' },
    { start: 9, end: 12, text: 'They automatically sync with playback' },
    { start: 12, end: 15, text: 'Perfect for accessibility!' },
  ];

  return (
    <Video
      source={{
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      }}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 8,
      }}
      subtitles={subtitles}
      autoPlay={true}
      loop={true}
      showControls={true}
    />
  );
}
