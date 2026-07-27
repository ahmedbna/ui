import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useEffect, useState } from 'react';

export function AudioWaveformInteractive() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Sample audio data - more realistic pattern
  const audioData = [
    0.2, 0.4, 0.3, 0.6, 0.8, 0.5, 0.7, 0.9, 0.4, 0.3, 0.5, 0.7, 0.6, 0.8, 0.9,
    0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.4, 0.6, 0.8, 0.7, 0.5, 0.3,
    0.4, 0.6, 0.9, 0.8, 0.6, 0.4, 0.2, 0.3, 0.5, 0.7,
  ];

  // Auto-play simulation
  useEffect(() => {
    let interval: number;
    if (isPlaying && !isSeeking) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isSeeking]);

  const handleSeek = (position: number) => {
    setProgress(position);
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (percentage: number) => {
    const totalSeconds = 180; // 3 minutes total
    const currentSeconds = (percentage / 100) * totalSeconds;
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = Math.floor(currentSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ gap: 16 }}>
      <AudioWaveform
        data={audioData}
        isPlaying={isPlaying}
        progress={progress}
        showProgress={true}
        interactive={true}
        onSeek={handleSeek}
        onSeekStart={handleSeekStart}
        onSeekEnd={handleSeekEnd}
        height={80}
        barCount={40}
        barWidth={4}
        barGap={2}
        activeColor='#007AFF'
        inactiveColor='#E5E5E7'
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,
        }}
      >
        <Text variant='caption' style={{ opacity: 0.6 }}>
          {formatTime(progress)}
        </Text>
        <Text variant='caption' style={{ opacity: 0.6 }}>
          3:00
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Button onPress={togglePlayback}>{isPlaying ? 'Pause' : 'Play'}</Button>

        <Button
          variant='outline'
          onPress={() => setProgress(0)}
          disabled={progress === 0}
        >
          Reset
        </Button>

        {isSeeking && (
          <Text variant='caption' style={{ color: '#007AFF' }}>
            Seeking...
          </Text>
        )}
      </View>
    </View>
  );
}
