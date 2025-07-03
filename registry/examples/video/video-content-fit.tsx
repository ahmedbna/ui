import { Text } from '@/components/ui/text';
import { Video } from '@/components/ui/video';
import { View } from '@/components/ui/view';
import React from 'react';

export function VideoContentFit() {
  const contentFitOptions: Array<{
    mode: 'contain' | 'cover' | 'fill';
    description: string;
  }> = [
    { mode: 'contain', description: 'Fit entirely within bounds' },
    { mode: 'cover', description: 'Fill bounds, may crop' },
    { mode: 'fill', description: 'Stretch to fill bounds' },
  ];

  return (
    <View style={{ gap: 16 }}>
      {contentFitOptions.map((option, index) => (
        <View key={index} style={{ gap: 8 }}>
          <View>
            <Text variant='body' style={{ fontWeight: '600' }}>
              {option.mode.charAt(0).toUpperCase() + option.mode.slice(1)}
            </Text>
            <Text variant='caption' style={{ opacity: 0.7 }}>
              {option.description}
            </Text>
          </View>
          <Video
            source={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            }}
            style={{
              width: '100%',
              height: 120,
              borderRadius: 8,
              backgroundColor: '#f0f0f0',
            }}
            contentFit={option.mode}
            autoPlay={false}
            showControls={true}
            muted={true}
          />
        </View>
      ))}
    </View>
  );
}
