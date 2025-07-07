import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useEffect, useState } from 'react';

export function AudioWaveformDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate audio playback progress
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = (position: number) => {
    setProgress(position);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={{ gap: 16 }}>
      <AudioWaveform
        isPlaying={isPlaying}
        progress={progress}
        showProgress={true}
        interactive={true}
        onSeek={handleSeek}
        height={60}
        barCount={40}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Button onPress={togglePlayback} style={{ flex: 0 }}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Text variant='caption'>{Math.round(progress)}% Complete</Text>
      </View>
    </View>
  );
}
