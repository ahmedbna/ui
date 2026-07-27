import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useEffect, useState } from 'react';

export function AudioWaveformRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingData, setRecordingData] = useState<number[]>([]);
  const [duration, setDuration] = useState(0);

  // Simulate recording with real-time audio levels
  useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = setInterval(() => {
        // Generate random audio level (simulating microphone input)
        const newLevel = Math.max(
          0.1,
          Math.random() * 0.9 + Math.sin(Date.now() / 200) * 0.2
        );

        setRecordingData((prev) => {
          const newData = [...prev, newLevel];
          // Keep only the last 50 data points
          return newData.slice(-50);
        });

        setDuration((prev) => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (!isRecording) {
      setRecordingData([]);
      setDuration(0);
    }
    setIsRecording(!isRecording);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          backgroundColor: isRecording ? '#FF3B30' : '#34C759',
          padding: 12,
          borderRadius: 12,
          opacity: 0.1,
        }}
      />

      <AudioWaveform
        data={recordingData}
        isPlaying={isRecording}
        animated={true}
        showProgress={false}
        height={60}
        barCount={50}
        activeColor={isRecording ? '#FF3B30' : '#34C759'}
        style={{
          backgroundColor: isRecording
            ? 'rgba(255, 59, 48, 0.05)'
            : 'rgba(52, 199, 89, 0.05)',
          borderRadius: 8,
          paddingHorizontal: 8,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onPress={toggleRecording}
          variant={isRecording ? 'destructive' : 'default'}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        <Text variant='caption'>{formatDuration(duration)}</Text>
      </View>

      {recordingData.length > 0 && !isRecording && (
        <Text variant='caption' style={{ textAlign: 'center', opacity: 0.6 }}>
          Tap play to preview your recording
        </Text>
      )}
    </View>
  );
}
