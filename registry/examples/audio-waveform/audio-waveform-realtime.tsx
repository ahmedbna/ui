import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useEffect, useState } from 'react';

export function AudioWaveformRealtime() {
  const [isActive, setIsActive] = useState(false);
  const [realtimeData, setRealtimeData] = useState<number[]>([]);
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(0.5);

  // Simulate real-time audio data with different patterns
  useEffect(() => {
    let interval: number;
    if (isActive) {
      interval = setInterval(() => {
        const time = Date.now() / 1000;

        // Generate different wave patterns based on frequency and amplitude
        let newLevel = 0;

        if (frequency === 1) {
          // Sine wave
          newLevel = Math.abs(Math.sin(time * 2) * amplitude);
        } else if (frequency === 2) {
          // Multiple frequencies combined
          newLevel = Math.abs(
            ((Math.sin(time * 3) +
              Math.sin(time * 1.5) +
              Math.sin(time * 0.8)) /
              3) *
              amplitude
          );
        } else {
          // Random with trend
          newLevel = Math.max(
            0,
            Math.min(1, Math.random() * amplitude + Math.sin(time * 0.5) * 0.3)
          );
        }

        setRealtimeData((prev) => {
          const newData = [...prev, newLevel];
          // Keep only the last 60 data points for smooth animation
          return newData.slice(-60);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isActive, frequency, amplitude]);

  const resetData = () => {
    setRealtimeData([]);
  };

  const patternButtons = [
    { id: 1, label: 'Sine Wave', color: '#007AFF' },
    { id: 2, label: 'Complex', color: '#34C759' },
    { id: 3, label: 'Random', color: '#FF9500' },
  ];

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          padding: 16,
          backgroundColor: isActive
            ? 'rgba(0, 122, 255, 0.05)'
            : 'rgba(142, 142, 147, 0.05)',
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isActive ? '#007AFF' : '#E5E5E7',
          borderStyle: isActive ? 'solid' : 'dashed',
        }}
      >
        <Text variant='body' style={{ marginBottom: 12, fontWeight: 'bold' }}>
          Real-time Audio Visualization
        </Text>

        <AudioWaveform
          data={realtimeData}
          isPlaying={isActive}
          animated={true}
          showProgress={false}
          height={80}
          barCount={60}
          barWidth={2}
          barGap={1}
          activeColor={
            frequency === 1
              ? '#007AFF'
              : frequency === 2
              ? '#34C759'
              : '#FF9500'
          }
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
            {realtimeData.length} data points
          </Text>
          <Text variant='caption' style={{ opacity: 0.6 }}>
            {isActive ? 'Live' : 'Stopped'}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            onPress={() => setIsActive(!isActive)}
            style={{
              backgroundColor: isActive ? '#FF3B30' : '#34C759',
              flex: 1,
            }}
          >
            {isActive ? 'Stop Stream' : 'Start Stream'}
          </Button>
          <Button
            onPress={resetData}
            variant='outline'
            disabled={realtimeData.length === 0}
          >
            Clear
          </Button>
        </View>

        {/* Pattern Selection */}
        <View>
          <Text variant='caption' style={{ marginBottom: 8, opacity: 0.7 }}>
            Wave Pattern:
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {patternButtons.map((pattern) => (
              <Button
                key={pattern.id}
                onPress={() => setFrequency(pattern.id)}
                variant={frequency === pattern.id ? 'default' : 'outline'}
                style={{
                  flex: 1,
                  backgroundColor:
                    frequency === pattern.id ? pattern.color : 'transparent',
                  borderColor: pattern.color,
                }}
              >
                <Text
                  style={{
                    color: frequency === pattern.id ? 'white' : pattern.color,
                    fontSize: 12,
                  }}
                >
                  {pattern.label}
                </Text>
              </Button>
            ))}
          </View>
        </View>

        {/* Amplitude Control */}
        <View>
          <Text variant='caption' style={{ marginBottom: 8, opacity: 0.7 }}>
            Amplitude: {Math.round(amplitude * 100)}%
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Button
              size='icon'
              variant='outline'
              onPress={() => setAmplitude(Math.max(0.1, amplitude - 0.1))}
            >
              -
            </Button>
            <View
              style={{
                flex: 1,
                height: 4,
                backgroundColor: '#E5E5E7',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${amplitude * 100}%`,
                  height: '100%',
                  backgroundColor: '#007AFF',
                }}
              />
            </View>
            <Button
              size='icon'
              variant='outline'
              onPress={() => setAmplitude(Math.min(1, amplitude + 0.1))}
            >
              +
            </Button>
          </View>
        </View>
      </View>

      <View
        style={{
          padding: 12,
          backgroundColor: 'rgba(255, 149, 0, 0.05)',
          borderRadius: 8,
        }}
      >
        <Text variant='caption' style={{ textAlign: 'center', opacity: 0.7 }}>
          Simulates real-time audio input with different wave patterns
        </Text>
      </View>
    </View>
  );
}
