import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { AudioSource, useAudioPlayer } from 'expo-audio';
import { Pause, Play, RotateCcw, Square } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface AudioPlayerProps {
  source: AudioSource;
  style?: ViewStyle;
  showControls?: boolean;
  showWaveform?: boolean;
  showTimer?: boolean;
  showProgressBar?: boolean;
  autoPlay?: boolean;
  onPlaybackStatusUpdate?: (status: any) => void;
}

export function AudioPlayer({
  source,
  style,
  showControls = true,
  showWaveform = true,
  showTimer = true,
  showProgressBar = true,
  autoPlay = false,
  onPlaybackStatusUpdate,
}: AudioPlayerProps) {
  const player = useAudioPlayer(source);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Enhanced waveform data - more bars for smoother visualization
  const [waveformData] = useState<number[]>(
    Array.from({ length: 60 }, (_, i) => {
      // Create more varied and realistic waveform pattern
      const base1 = Math.sin((i / 60) * Math.PI * 6) * 0.4 + 0.5;
      const base2 = Math.sin((i / 60) * Math.PI * 2.5) * 0.3 + 0.4;
      const noise = (Math.random() - 0.5) * 0.25;
      const peak = Math.random() < 0.15 ? Math.random() * 0.4 : 0; // Occasional peaks
      return Math.max(0.15, Math.min(0.95, (base1 + base2) / 2 + noise + peak));
    })
  );

  // Theme colors
  const redColor = useThemeColor({}, 'destructive');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');

  useEffect(() => {
    if (autoPlay && player.isLoaded && !player.playing) {
      player.play();
    }
  }, [autoPlay, player.isLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.isLoaded && !isSeeking) {
        const currentTime = player.currentTime || 0;
        const totalDuration = player.duration || 0;

        setDuration(totalDuration);
        setPosition(currentTime);

        // Check if the audio finished
        if (currentTime >= totalDuration && totalDuration > 0) {
          player.seekTo(0);
          player.pause(); // Ensure it's paused
        }

        if (onPlaybackStatusUpdate) {
          onPlaybackStatusUpdate({
            isLoaded: player.isLoaded,
            playing: player.playing,
            duration: totalDuration,
            position: currentTime,
          });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [player, onPlaybackStatusUpdate, isSeeking]);

  const handlePlayPause = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleBackFiveSeconds = () => {
    const newPosition = Math.max(0, position - 5);
    seekToPosition(newPosition);
  };

  const handleRestart = () => {
    seekToPosition(0);
  };

  // Unified seeking function
  const seekToPosition = useCallback(
    (newPosition: number) => {
      if (player.isLoaded && duration > 0) {
        const clampedPosition = Math.max(0, Math.min(duration, newPosition));
        player.seekTo(clampedPosition);
        setPosition(clampedPosition);
      }
    },
    [player, duration]
  );

  // Handle waveform seeking
  const handleWaveformSeek = useCallback(
    (seekPercentage: number) => {
      if (duration > 0) {
        const newPosition = (seekPercentage / 100) * duration;
        seekToPosition(newPosition);
      }
    },
    [duration, seekToPosition]
  );

  // Handle progress bar seeking
  const handleProgressSeek = useCallback(
    (progressValue: number) => {
      if (duration > 0) {
        const newPosition = (progressValue / 100) * duration;
        seekToPosition(newPosition);
      }
    },
    [duration, seekToPosition]
  );

  // Handle seeking start/end for smooth updates
  const handleSeekStart = useCallback(() => {
    setIsSeeking(true);
  }, []);

  const handleSeekEnd = useCallback(() => {
    setIsSeeking(false);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View
      style={[styles.container, { backgroundColor: secondaryColor }, style]}
    >
      {/* Waveform Visualization with seeking capability */}
      {showWaveform && (
        <View style={styles.waveformContainer}>
          <AudioWaveform
            data={waveformData}
            isPlaying={player.playing}
            progress={progressPercentage}
            onSeek={handleWaveformSeek}
            onSeekStart={handleSeekStart}
            onSeekEnd={handleSeekEnd}
            height={80}
            barCount={60}
            barWidth={4}
            barGap={1.5}
            activeColor={redColor}
            inactiveColor={mutedColor}
            animated={true}
            showProgress={true}
            interactive={true} // Enable seeking
          />
        </View>
      )}

      {/* Interactive Progress Bar */}
      {showProgressBar && (
        <View style={styles.progressContainer}>
          <Progress
            value={progressPercentage}
            onValueChange={handleProgressSeek}
            onSeekStart={handleSeekStart}
            onSeekEnd={handleSeekEnd}
            interactive={true}
            height={6}
            style={styles.progressBar}
          />
        </View>
      )}

      {/* Controls */}
      {showControls && (
        <View style={styles.controlsContainer}>
          <Button
            variant='ghost'
            size='icon'
            onPress={handleBackFiveSeconds}
            style={styles.controlButton}
            disabled={!player.isLoaded}
          >
            <RotateCcw size={18} color={textColor} />
          </Button>

          <Button
            size='icon'
            variant='destructive'
            onPress={handlePlayPause}
            disabled={!player.isLoaded}
            style={styles.playButton}
          >
            {player.playing ? (
              <Pause size={24} color='white' />
            ) : (
              <Play size={24} color='white' />
            )}
          </Button>

          <Button
            variant='ghost'
            size='icon'
            onPress={handleRestart}
            style={styles.controlButton}
            disabled={!player.isLoaded}
          >
            <Square fill={textColor} size={18} color={textColor} />
          </Button>
        </View>
      )}

      {/* Timer */}
      {showTimer && (
        <View style={styles.timerContainer}>
          <Text variant='caption' style={{ color: mutedColor }}>
            {formatTime(position)} / {formatTime(duration)}
          </Text>
        </View>
      )}

      {/* Loading State */}
      {!player.isLoaded && (
        <View style={styles.loadingContainer}>
          <Text variant='caption' style={{ color: mutedColor }}>
            Loading audio...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    padding: 16,
    margin: 8,
  },
  waveformContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  progressBar: {
    // Additional styling if needed
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
  },
  playButton: {
    width: 56,
    height: 56,
  },
  timerContainer: {
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 8,
  },
});
