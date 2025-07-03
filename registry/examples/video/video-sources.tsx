import { Text } from '@/components/ui/text';
import { Video } from '@/components/ui/video';
import { View } from '@/components/ui/view';
import React from 'react';

export function VideoSources() {
  const videoSources = [
    {
      title: 'MP4 Source',
      uri: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
    },
    {
      title: 'Alternative MP4',
      uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
  ];

  return (
    <View style={{ gap: 16 }}>
      {videoSources.map((source, index) => (
        <View key={index} style={{ gap: 8 }}>
          <Text variant='body' style={{ fontWeight: '600' }}>
            {source.title}
          </Text>
          <Video
            source={{ uri: source.uri }}
            style={{
              width: '100%',
              height: 160,
              borderRadius: 8,
            }}
            autoPlay={false}
            showControls={true}
          />
        </View>
      ))}
    </View>
  );
}
