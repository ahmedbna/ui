import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function AudioWaveformCompact() {
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isPlaying3, setIsPlaying3] = useState(false);
  const [progress1, setProgress1] = useState(20);
  const [progress2, setProgress2] = useState(45);
  const [progress3, setProgress3] = useState(70);

  // Compact chat message data
  const messageData1 = [
    0.3, 0.5, 0.4, 0.6, 0.3, 0.4, 0.5, 0.3, 0.4, 0.6, 0.5, 0.3, 0.4, 0.5, 0.3,
  ];
  const messageData2 = [
    0.2, 0.4, 0.6, 0.5, 0.3, 0.5, 0.4, 0.6, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3,
  ];
  const messageData3 = [
    0.4, 0.6, 0.5, 0.7, 0.4, 0.3, 0.5, 0.6, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.4,
  ];

  const MessageBubble = ({
    data,
    isPlaying,
    setIsPlaying,
    progress,
    setProgress,
    duration,
    sent = false,
  }: {
    data: number[];
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    progress: number;
    setProgress: (progress: number) => void;
    duration: string;
    sent?: boolean;
  }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: sent ? 'flex-end' : 'flex-start',
        backgroundColor: sent ? '#007AFF' : '#F0F0F0',
        borderRadius: 18,
        padding: 8,
        maxWidth: '80%',
        gap: 8,
      }}
    >
      <Button
        onPress={() => setIsPlaying(!isPlaying)}
        variant='ghost'
        size='icon'
      >
        {isPlaying ? '⏸️' : '▶️'}
      </Button>

      <View style={{ flex: 1 }}>
        <AudioWaveform
          data={data}
          isPlaying={isPlaying}
          progress={progress}
          showProgress={true}
          interactive={true}
          onSeek={setProgress}
          height={24}
          barCount={15}
          barWidth={2}
          barGap={1}
          activeColor={sent ? 'white' : '#007AFF'}
          inactiveColor={sent ? 'rgba(255, 255, 255, 0.4)' : '#C7C7CC'}
        />
      </View>

      <Text
        style={{
          color: sent ? 'rgba(255, 255, 255, 0.8)' : '#8E8E93',
          fontSize: 11,
          minWidth: 28,
        }}
      >
        {duration}
      </Text>
    </View>
  );

  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 12 }}>
        <MessageBubble
          data={messageData1}
          isPlaying={isPlaying1}
          setIsPlaying={setIsPlaying1}
          progress={progress1}
          setProgress={setProgress1}
          duration='0:12'
          sent={false}
        />

        <MessageBubble
          data={messageData2}
          isPlaying={isPlaying2}
          setIsPlaying={setIsPlaying2}
          progress={progress2}
          setProgress={setProgress2}
          duration='0:08'
          sent={true}
        />

        <MessageBubble
          data={messageData3}
          isPlaying={isPlaying3}
          setIsPlaying={setIsPlaying3}
          progress={progress3}
          setProgress={setProgress3}
          duration='0:15'
          sent={false}
        />
      </View>
    </View>
  );
}
