import { AudioPlayer } from '@/components/ui/audio-player';
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import {
  AudioModule,
  RecordingOptions,
  RecordingPresets,
  useAudioRecorder,
} from 'expo-audio';
import { Circle, Download, Mic, Square, Trash2 } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export interface AudioRecorderProps {
  style?: ViewStyle;
  quality?: 'high' | 'low';
  showWaveform?: boolean;
  showTimer?: boolean;
  maxDuration?: number; // in seconds
  onRecordingComplete?: (uri: string) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  customRecordingOptions?: RecordingOptions;
}

export function AudioRecorder({
  style,
  quality = 'high',
  showWaveform = true,
  showTimer = true,
  maxDuration,
  onRecordingComplete,
  onRecordingStart,
  onRecordingStop,
  customRecordingOptions,
}: AudioRecorderProps) {
  const recordingOptions =
    customRecordingOptions ||
    (quality === 'high'
      ? RecordingPresets.HIGH_QUALITY
      : RecordingPresets.LOW_QUALITY);

  const recorder = useAudioRecorder(recordingOptions);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Waveform data for real-time visualization
  const [waveformData, setWaveformData] = useState<number[]>(
    Array.from({ length: 30 }, () => 0.2)
  );

  // Theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const redColor = useThemeColor({}, 'red');
  const greenColor = useThemeColor({}, 'green');

  // Animation values
  const recordingPulse = useRef(new Animated.Value(1)).current;
  const durationInterval = useRef<number | null>(null);
  const meteringInterval = useRef<number | null>(null);

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        setPermissionGranted(status.granted);

        if (!status.granted) {
          Alert.alert(
            'Permission Required',
            'Please grant microphone permission to record audio.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
        setPermissionGranted(false);
      }
    })();
  }, []);

  // Recording pulse animation
  useEffect(() => {
    if (isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(recordingPulse, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(recordingPulse, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => pulse.stop();
    } else {
      recordingPulse.setValue(1);
    }
  }, [isRecording]);

  // Real-time waveform updates during recording
  useEffect(() => {
    if (isRecording) {
      meteringInterval.current = setInterval(async () => {
        try {
          // Try to get metering data from recorder
          const status = recorder.getStatus();
          let level = 0.3; // Default fallback level

          if (status && typeof status.metering === 'number') {
            // Convert dB to normalized value (typical range -160 to 0 dB)
            const dbLevel = status.metering;
            level = Math.max(0.1, Math.min(1.0, (dbLevel + 50) / 50));
          } else {
            // Generate more realistic simulated audio levels
            const time = Date.now() / 1000;
            const baseLevel = 0.3 + Math.sin(time * 2) * 0.2; // Sine wave base
            const variation = (Math.random() - 0.5) * 0.4; // Random variation
            const spike = Math.random() < 0.1 ? Math.random() * 0.3 : 0; // Occasional spikes
            level = Math.max(0.1, Math.min(0.9, baseLevel + variation + spike));
          }

          // Update waveform data by shifting array and adding new value
          setWaveformData((prevData) => {
            const newData = [...prevData.slice(1), level];
            return newData;
          });
        } catch (error) {
          console.log('Using simulated audio data');
          // Fallback to realistic simulated data
          const time = Date.now() / 1000;
          const baseLevel = 0.4 + Math.sin(time * 3) * 0.2;
          const noise = (Math.random() - 0.5) * 0.3;
          const level = Math.max(0.15, Math.min(0.85, baseLevel + noise));

          setWaveformData((prevData) => [...prevData.slice(1), level]);
        }
      }, 80); // Update every 80ms for smooth animation

      return () => {
        if (meteringInterval.current) {
          clearInterval(meteringInterval.current);
          meteringInterval.current = null;
        }
      };
    } else {
      // Reset to quiet state when not recording
      setWaveformData(Array.from({ length: 30 }, () => 0.2));

      if (meteringInterval.current) {
        clearInterval(meteringInterval.current);
        meteringInterval.current = null;
      }
    }
  }, [isRecording, recorder]);

  // Auto-stop recording when max duration is reached
  useEffect(() => {
    if (maxDuration && duration >= maxDuration && isRecording) {
      handleStopRecording();
    }
  }, [duration, maxDuration, isRecording]);

  const startDurationTimer = () => {
    setDuration(0);
    durationInterval.current = setInterval(() => {
      setDuration((prev) => prev + 0.1);
    }, 100);
  };

  const stopDurationTimer = () => {
    if (durationInterval.current) {
      clearInterval(durationInterval.current);
      durationInterval.current = null;
    }
  };

  const handleStartRecording = async () => {
    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Microphone permission is required to record audio.'
      );
      return;
    }

    try {
      console.log('Starting recording...');
      setRecordingUri(null);
      setIsRecording(true);
      startDurationTimer();

      // Enable metering in recording options
      const meteringOptions = {
        ...recordingOptions,
        isMeteringEnabled: true,
      };

      await recorder.prepareToRecordAsync(meteringOptions);
      await recorder.record();

      onRecordingStart?.();
      console.log('Recording started successfully');
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      stopDurationTimer();
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const handleStopRecording = async () => {
    try {
      console.log('Stopping recording...');
      setIsRecording(false);
      stopDurationTimer();

      await recorder.stop();
      const uri = recorder.uri;
      console.log('Recording stopped, URI:', uri);

      if (uri) {
        setRecordingUri(uri);
        onRecordingComplete?.(uri);
      }

      onRecordingStop?.();
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  const handleDeleteRecording = () => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setRecordingUri(null);
            setDuration(0);
          },
        },
      ]
    );
  };

  const handleSaveRecording = () => {
    if (recordingUri && onRecordingComplete) {
      onRecordingComplete(recordingUri);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centisecs = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${centisecs
      .toString()
      .padStart(2, '0')}`;
  };

  if (!permissionGranted) {
    return (
      <View
        style={[styles.container, { backgroundColor: secondaryColor }, style]}
      >
        <Text variant='body' style={{ color: textColor, textAlign: 'center' }}>
          Microphone permission is required to record audio.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: secondaryColor }, style]}
    >
      {recordingUri && !isRecording ? (
        <View style={{ alignItems: 'center' }}>
          <AudioPlayer
            source={{ uri: recordingUri }}
            showControls={true}
            showWaveform={true}
            showTimer={true}
            autoPlay={false}
            onPlaybackStatusUpdate={(status) => {
              console.log('Playback status:', status);
            }}
          />
          <View style={styles.playbackControls}>
            <Button
              variant='outline'
              size='icon'
              onPress={handleDeleteRecording}
              style={styles.controlButton}
            >
              <Trash2 size={20} color={redColor} />
            </Button>

            <Button
              variant='default'
              onPress={handleSaveRecording}
              style={[styles.saveButton, { backgroundColor: greenColor }]}
            >
              <Download size={20} color='white' />
              <Text style={{ color: 'white', marginLeft: 8 }}>Save</Text>
            </Button>
          </View>
        </View>
      ) : (
        <View>
          {/* Recording Status */}
          {isRecording ? (
            <View style={styles.recordingStatus}>
              <View style={styles.recordingIndicator}>
                <Circle size={8} color={redColor} fill={redColor} />
                <Text
                  variant='caption'
                  style={{ color: redColor, marginLeft: 8 }}
                >
                  Recording
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ height: 36 }} />
          )}
          {/* Waveform Visualization */}
          {showWaveform && (
            <View style={styles.waveformContainer}>
              <AudioWaveform
                data={waveformData}
                isPlaying={false} // Disable built-in animation
                progress={0}
                height={60}
                barCount={30}
                barWidth={4}
                barGap={2}
                activeColor={isRecording ? redColor : primaryColor}
                inactiveColor={mutedColor}
                animated={false} // Disable built-in animation to use real-time data
              />
            </View>
          )}
          {/* Timer */}
          {showTimer && (
            <View style={styles.timerContainer}>
              <Text
                variant='title'
                style={{
                  color: isRecording ? redColor : textColor,
                  fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                }}
              >
                {formatTime(duration)}
              </Text>
              {maxDuration && (
                <Text variant='caption' style={{ color: mutedColor }}>
                  Max: {formatTime(maxDuration)}
                </Text>
              )}
            </View>
          )}

          {/* Controls */}
          <View style={styles.controlsContainer}>
            {!isRecording && !recordingUri && (
              <Animated.View style={{ transform: [{ scale: recordingPulse }] }}>
                <Button
                  variant='default'
                  size='lg'
                  onPress={handleStartRecording}
                  style={[styles.recordButton, { backgroundColor: redColor }]}
                >
                  <Mic size={32} color='white' />
                </Button>
              </Animated.View>
            )}

            {isRecording && (
              <Button
                variant='default'
                size='lg'
                onPress={handleStopRecording}
                style={[styles.stopButton, { backgroundColor: redColor }]}
              >
                <Square size={32} fill='white' color='white' />
              </Button>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    padding: 20,
    alignItems: 'center',
  },
  recordingStatus: {
    height: 36,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stopButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  controlButton: {
    width: 48,
    height: 48,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
