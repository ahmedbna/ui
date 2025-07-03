import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function AudioWaveformStyled() {
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isPlaying3, setIsPlaying3] = useState(false);
  const [progress1, setProgress1] = useState(35);
  const [progress2, setProgress2] = useState(60);
  const [progress3, setProgress3] = useState(80);

  const musicData = [
    0.1, 0.3, 0.5, 0.4, 0.6, 0.8, 0.7, 0.9, 0.6, 0.4, 0.5, 0.7, 0.8, 0.9, 0.7,
    0.5, 0.3, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.4, 0.6, 0.8, 0.7, 0.5, 0.3, 0.4,
  ];

  const voiceData = [
    0.2, 0.4, 0.3, 0.5, 0.4, 0.6, 0.5, 0.7, 0.4, 0.3, 0.5, 0.4, 0.6, 0.5, 0.4,
    0.3, 0.4, 0.5, 0.6, 0.4, 0.3, 0.5, 0.4, 0.3, 0.4, 0.5, 0.4, 0.3, 0.2, 0.3,
  ];

  const podcastData = [
    0.3, 0.5, 0.4, 0.6, 0.5, 0.4, 0.6, 0.7, 0.5, 0.4, 0.6, 0.5, 0.7, 0.6, 0.5,
    0.4, 0.5, 0.6, 0.7, 0.5, 0.4, 0.6, 0.5, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.4,
  ];

  return (
    <View style={{ gap: 24 }}>
      {/* Music Style - Vibrant gradient colors */}
      <View
        style={{
          padding: 16,
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 16,
          shadowColor: '#667eea',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <Text
          variant='body'
          style={{ color: 'white', marginBottom: 12, fontWeight: 'bold' }}
        >
          🎵 Music Track
        </Text>
        <AudioWaveform
          data={musicData}
          isPlaying={isPlaying1}
          progress={progress1}
          showProgress={true}
          interactive={true}
          onSeek={setProgress1}
          height={60}
          barCount={30}
          barWidth={4}
          barGap={3}
          activeColor='#FFD700'
          inactiveColor='rgba(255, 255, 255, 0.3)'
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <Button
            onPress={() => setIsPlaying1(!isPlaying1)}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            {isPlaying1 ? '⏸️' : '▶️'}
          </Button>
          <Text style={{ color: 'white', opacity: 0.8 }}>2:15 / 3:45</Text>
        </View>
      </View>

      {/* Voice Message Style - Clean and minimal */}
      <View
        style={{
          padding: 16,
          backgroundColor: 'teal',
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: '#34C759',
        }}
      >
        <Text variant='body' style={{ marginBottom: 12, fontWeight: '600' }}>
          🎙️ Voice Message
        </Text>
        <AudioWaveform
          data={voiceData}
          isPlaying={isPlaying2}
          progress={progress2}
          showProgress={true}
          interactive={true}
          onSeek={setProgress2}
          height={40}
          barCount={25}
          barWidth={3}
          barGap={2}
          activeColor='#34C759'
          inactiveColor='#E5E5E7'
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Button
            onPress={() => setIsPlaying2(!isPlaying2)}
            variant='outline'
            style={{
              borderColor: '#34C759',
              borderRadius: 20,
              paddingHorizontal: 16,
            }}
          >
            {isPlaying2 ? 'Pause' : 'Play'}
          </Button>
          <Text variant='caption'>0:45</Text>
        </View>
      </View>

      {/* Podcast Style - Professional dark theme */}
      <View
        style={{
          padding: 16,
          backgroundColor: '#1C1C1E',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#2C2C2E',
        }}
      >
        <Text
          variant='body'
          style={{ color: 'white', marginBottom: 12, fontWeight: 'bold' }}
        >
          🎧 Podcast Episode
        </Text>
        <AudioWaveform
          data={podcastData}
          isPlaying={isPlaying3}
          progress={progress3}
          showProgress={true}
          interactive={true}
          onSeek={setProgress3}
          height={70}
          barCount={35}
          barWidth={2}
          barGap={1}
          activeColor='#FF6B6B'
          inactiveColor='#48484A'
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              onPress={() => setIsPlaying3(!isPlaying3)}
              style={{
                backgroundColor: '#FF6B6B',
                borderRadius: 8,
                paddingHorizontal: 12,
              }}
            >
              {isPlaying3 ? '⏸️' : '▶️'}
            </Button>
            <Button
              variant='outline'
              style={{
                borderColor: '#48484A',
                borderRadius: 8,
              }}
            >
              1.5x
            </Button>
          </View>
          <Text style={{ color: 'white', opacity: 0.6 }}>45:30 / 58:15</Text>
        </View>
      </View>
    </View>
  );
}
