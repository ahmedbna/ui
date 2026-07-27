import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function ProgressMedia() {
  const [progress, setProgress] = useState(35);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);

  const formatTime = (percent: number) => {
    const totalSeconds = Math.floor((percent / 100) * 180); // 3 minute song
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ gap: 20 }}>
      {/* Media Player */}
      <View
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: 12,
          padding: 16,
          gap: 12,
        }}
      >
        <View style={{ gap: 8 }}>
          <Text variant='body' style={{ color: '#fff', fontWeight: '600' }}>
            Song Title
          </Text>
          <Text variant='caption' style={{ color: '#999' }}>
            Artist Name
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Progress
            value={progress}
            interactive
            height={4}
            onValueChange={setProgress}
            style={{ backgroundColor: '#333' }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text variant='caption' style={{ color: '#999' }}>
              {formatTime(progress)}
            </Text>
            <Text variant='caption' style={{ color: '#999' }}>
              3:00
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#007AFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>
              {isPlaying ? '⏸️' : '▶️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Volume Control */}
      <View
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 8,
          padding: 12,
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text>🔊</Text>
          <View style={{ flex: 1 }}>
            <Progress
              value={volume}
              interactive
              height={6}
              onValueChange={setVolume}
            />
          </View>
          <Text variant='caption' style={{ color: '#666' }}>
            {Math.round(volume)}%
          </Text>
        </View>
      </View>
    </View>
  );
}
