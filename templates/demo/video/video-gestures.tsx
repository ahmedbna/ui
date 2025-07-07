import { Text } from '@/components/ui/text';
import { Video } from '@/components/ui/video';
import { View } from '@/components/ui/view';
import React from 'react';

export function VideoGestures() {
  return (
    <View style={{ gap: 12 }}>
      <Text variant='body' style={{ fontSize: 14, opacity: 0.8 }}>
        Tap center to play/pause • Tap left to seek back • Tap right to seek
        forward
      </Text>
      <Video
        source={{
          uri: 'https://bna-ui.s3.eu-north-1.amazonaws.com/',
        }}
        style={{
          width: '100%',
          height: 220,
          borderRadius: 12,
        }}
        seekBy={10}
        autoPlay={false}
        showControls={true}
        onPlaybackStatusUpdate={(status) => {
          // Handle playback updates
        }}
      />
      <Text variant='caption' style={{ textAlign: 'center', opacity: 0.6 }}>
        Try the gesture controls! This video seeks by 10 seconds.
      </Text>
    </View>
  );
}
