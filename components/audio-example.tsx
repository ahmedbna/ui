// app/(tabs)/audio-example.tsx
import { AudioPlayer } from '@/components/ui/audio-player';
import { AudioRecorder } from '@/components/ui/audio-recorder';
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

export function AudioExample() {
  const [recordedAudioUri, setRecordedAudioUri] = useState<string | null>(null);
  const [waveformProgress, setWaveformProgress] = useState(45);
  const [waveformPlaying, setWaveformPlaying] = useState(false);

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  // Sample audio data for waveform
  const sampleWaveformData = [
    0.2, 0.4, 0.6, 0.8, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.9, 0.8, 0.6, 0.4,
    0.2, 0.3, 0.5, 0.7, 0.9, 0.8, 0.6, 0.4, 0.5, 0.7, 0.8, 0.9, 0.7, 0.5, 0.3,
    0.2, 0.4, 0.6, 0.8, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.9, 0.8, 0.6, 0.4, 0.2,
    0.3, 0.5, 0.7, 0.9, 0.8,
  ];

  const handleRecordingComplete = (uri: string) => {
    setRecordedAudioUri(uri);
  };

  const handleWaveformSeek = (position: number) => {
    setWaveformProgress(position);
    Alert.alert('Seek', `Seeked to ${position.toFixed(1)}%`);
  };

  const toggleWaveformPlayback = () => {
    setWaveformPlaying(!waveformPlaying);
  };

  const simulateWaveformProgress = () => {
    const interval = setInterval(() => {
      setWaveformProgress((prev) => {
        if (prev >= 100) {
          setWaveformPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleWaveformPlay = () => {
    setWaveformPlaying(true);
    simulateWaveformProgress();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant='heading' style={{ color: textColor }}>
            Audio Components
          </Text>
          <Text
            variant='body'
            style={{ color: mutedColor, textAlign: 'center' }}
          >
            Interactive demo of audio recording, playback, and waveform
            visualization
          </Text>
        </View>

        {/* Audio Recorder Section */}
        <View style={[styles.section, { backgroundColor: secondaryColor }]}>
          <View style={styles.sectionHeader}>
            <Text variant='title' style={{ color: textColor }}>
              Audio Recorder
            </Text>
            <Text variant='body' style={{ color: mutedColor }}>
              Record high-quality audio with real-time waveform visualization
            </Text>
          </View>

          <AudioRecorder
            quality='high'
            showWaveform={true}
            showTimer={true}
            maxDuration={30} // 30 seconds max
            onRecordingComplete={handleRecordingComplete}
            onRecordingStart={() => console.log('Recording started')}
            onRecordingStop={() => console.log('Recording stopped')}
          />

          <View style={styles.featureList}>
            <Text variant='caption' style={{ color: mutedColor }}>
              • Real-time waveform animation{'\n'}• Timer with max duration
              limit{'\n'}• High-quality recording presets{'\n'}• Save and delete
              functionality
            </Text>
          </View>
        </View>

        {/* Audio Player Section */}
        {recordedAudioUri && (
          <View style={[styles.section, { backgroundColor: secondaryColor }]}>
            <View style={styles.sectionHeader}>
              <Text variant='title' style={{ color: textColor }}>
                Audio Player
              </Text>
              <Text variant='body' style={{ color: mutedColor }}>
                Play your recorded audio with visual feedback
              </Text>
            </View>

            <AudioPlayer
              source={{ uri: recordedAudioUri }}
              showControls={true}
              showWaveform={true}
              showTimer={true}
              autoPlay={false}
              onPlaybackStatusUpdate={(status) => {
                console.log('Playback status:', status);
              }}
            />

            <View style={styles.featureList}>
              <Text variant='caption' style={{ color: mutedColor }}>
                • Animated waveform during playback{'\n'}• Progress bar with
                visual feedback{'\n'}• Play/pause and restart controls{'\n'}•
                Duration and position display
              </Text>
            </View>
          </View>
        )}

        {/* Audio Waveform Section */}
        <View style={[styles.section, { backgroundColor: secondaryColor }]}>
          <View style={styles.sectionHeader}>
            <Text variant='title' style={{ color: textColor }}>
              Audio Waveform
            </Text>
            <Text variant='body' style={{ color: mutedColor }}>
              Interactive waveform with seek functionality
            </Text>
          </View>

          <AudioWaveform
            data={sampleWaveformData}
            isPlaying={waveformPlaying}
            progress={waveformProgress}
            onSeek={handleWaveformSeek}
            height={80}
            barCount={50}
            barWidth={4}
            barGap={2}
            animated={true}
          />

          <View style={styles.waveformControls}>
            <Button
              variant={waveformPlaying ? 'outline' : 'default'}
              onPress={
                waveformPlaying
                  ? () => setWaveformPlaying(false)
                  : handleWaveformPlay
              }
              style={styles.controlButton}
            >
              {waveformPlaying ? 'Pause' : 'Play Demo'}
            </Button>

            <Button
              variant='outline'
              onPress={() => {
                setWaveformProgress(0);
                setWaveformPlaying(false);
              }}
              style={styles.controlButton}
            >
              <Text style={{ color: textColor }}>Reset</Text>
            </Button>
          </View>

          <View style={styles.progressInfo}>
            <Text variant='caption' style={{ color: mutedColor }}>
              Progress: {waveformProgress.toFixed(1)}%
            </Text>
          </View>

          <View style={styles.featureList}>
            <Text variant='caption' style={{ color: mutedColor }}>
              • Tap bars to seek to position{'\n'}• Animated bars during
              playback{'\n'}• Customizable appearance{'\n'}• Progress
              visualization
            </Text>
          </View>
        </View>

        {/* Customization demo */}
        <View style={[styles.section, { backgroundColor: secondaryColor }]}>
          <View style={styles.sectionHeader}>
            <Text variant='title' style={{ color: textColor }}>
              Customization demo
            </Text>
            <Text variant='body' style={{ color: mutedColor }}>
              Different styles and configurations
            </Text>
          </View>

          {/* Compact Waveform */}
          <View style={styles.customExample}>
            <Text
              variant='heading'
              style={{ color: textColor, marginBottom: 8 }}
            >
              Compact Style
            </Text>
            <AudioWaveform
              data={sampleWaveformData.slice(0, 25)}
              isPlaying={false}
              progress={60}
              height={40}
              barCount={25}
              barWidth={2}
              barGap={1}
              animated={false}
              activeColor={primaryColor}
              inactiveColor={mutedColor}
            />
          </View>

          {/* Large Waveform */}
          <View style={styles.customExample}>
            <Text
              variant='heading'
              style={{ color: textColor, marginBottom: 8 }}
            >
              Large Style
            </Text>
            <AudioWaveform
              data={sampleWaveformData.slice(0, 30)}
              isPlaying={true}
              progress={30}
              height={100}
              barCount={30}
              barWidth={6}
              barGap={3}
              animated={true}
              activeColor='#FF3B30'
              inactiveColor='#C6C6C8'
            />
          </View>
        </View>

        {/* Instructions */}
        <View style={[styles.section, { backgroundColor: secondaryColor }]}>
          <View style={styles.sectionHeader}>
            <Text variant='title' style={{ color: textColor }}>
              How to Use
            </Text>
          </View>

          <View style={styles.instructions}>
            <Text variant='body' style={{ color: textColor, marginBottom: 12 }}>
              <Text style={{ fontWeight: '600' }}>1. Record Audio:</Text> Tap
              the red record button to start recording. The waveform will
              animate in real-time.
            </Text>

            <Text variant='body' style={{ color: textColor, marginBottom: 12 }}>
              <Text style={{ fontWeight: '600' }}>2. Play Recording:</Text> Once
              recorded, use the audio player to play back your recording with
              visual feedback.
            </Text>

            <Text variant='body' style={{ color: textColor, marginBottom: 12 }}>
              <Text style={{ fontWeight: '600' }}>
                3. Interactive Waveform:
              </Text>{' '}
              Tap on any bar in the waveform to seek to that position.
            </Text>

            <Text variant='body' style={{ color: textColor }}>
              <Text style={{ fontWeight: '600' }}>4. Customize:</Text> All
              components support extensive customization options for colors,
              sizes, and behavior.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  section: {
    margin: 16,
    borderRadius: BORDER_RADIUS,
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  featureList: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  waveformControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  controlButton: {
    paddingHorizontal: 20,
  },
  progressInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  customExample: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  instructions: {
    paddingHorizontal: 4,
  },
});
