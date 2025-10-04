import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface VideoProps {
  source: VideoSource;
  style?: ViewStyle;
  seekBy?: number; // seconds to seek by on double tap
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  nativeControls?: boolean;
  showControls?: boolean;
  allowsFullscreen?: boolean;
  allowsPictureInPicture?: boolean;
  contentFit?: 'contain' | 'cover' | 'fill';
  onLoad?: () => void;
  onError?: (error: any) => void;
  onPlaybackStatusUpdate?: (status: any) => void;
  onFullscreenUpdate?: (isFullscreen: boolean) => void;
  subtitles?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
}

interface VideoRef {
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  isPlaying: () => boolean;
  isMuted: () => boolean;
}

// Helper function to format time
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// --- Custom Reanimated Progress Bar ---
const PROGRESS_HEIGHT = 8;
const THUMB_SIZE = 16;

interface ReanimatedProgressProps {
  duration: number;
  currentTime: number;
  onSeek: (progress: number) => void;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
}

const ReanimatedProgress = ({
  duration,
  currentTime,
  onSeek,
  onSeekStart,
  onSeekEnd,
}: ReanimatedProgressProps) => {
  const [barWidth, setBarWidth] = useState(0);
  const isScrubbing = useSharedValue(false);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  useDerivedValue(() => {
    if (!isScrubbing.value && duration > 0 && barWidth > 0) {
      const progress = currentTime / duration;
      translateX.value = withTiming(progress * barWidth, { duration: 100 });
    }
  });

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .onBegin(() => {
      isScrubbing.value = true;
      scale.value = withTiming(1.2);
      if (onSeekStart) runOnJS(onSeekStart)();
    })
    .onChange((event) => {
      translateX.value = Math.max(
        0,
        Math.min(barWidth, translateX.value + event.changeX)
      );
    })
    .onEnd(() => {
      const finalProgress = translateX.value / barWidth;
      runOnJS(onSeek)(finalProgress);
      isScrubbing.value = false;
      scale.value = withTiming(1);
      if (onSeekEnd) runOnJS(onSeekEnd)();
    });

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      if (onSeekStart) runOnJS(onSeekStart)();
    })
    .onEnd((event) => {
      const newTranslateX = Math.max(0, Math.min(barWidth, event.x));
      translateX.value = newTranslateX;
      const finalProgress = newTranslateX / barWidth;
      runOnJS(onSeek)(finalProgress);
      if (onSeekEnd) runOnJS(onSeekEnd)();
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }));

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={progressStyles.container}
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
      >
        <View style={progressStyles.track} />
        <Animated.View
          style={[progressStyles.progress, animatedProgressStyle]}
        />
        <Animated.View
          style={[progressStyles.thumbContainer, animatedThumbStyle]}
        >
          <View style={progressStyles.thumb} />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

// --- Main Video Component ---
export const Video = forwardRef<VideoView, VideoProps>(
  (
    {
      source,
      style,
      autoPlay = false,
      loop = false,
      muted = false,
      nativeControls = false,
      allowsFullscreen = true,
      allowsPictureInPicture = true,
      contentFit = 'cover',
      onLoad,
      onError,
      seekBy = 2,
      onPlaybackStatusUpdate,
      onFullscreenUpdate,
      subtitles = [],
      ...props
    },
    ref
  ) => {
    const textColor = useColor('text');
    const cardColor = useColor('card');
    const mutedColor = useColor('mutedForeground');

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(muted);
    const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showPlayIcon, setShowPlayIcon] = useState(false);
    const [showCustomControls, setShowCustomControls] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);

    const hideControlsTimeout = useRef<number | null>(null);
    const hidePlayIconTimeout = useRef<number | null>(null);

    const controlsOpacity = useSharedValue(0);
    const playIconOpacity = useSharedValue(0);

    const player = useVideoPlayer(source, (player) => {
      try {
        if (autoPlay && player.play) player.play();
        player.loop = loop;
        player.muted = muted;
        onLoad?.();
      } catch (error) {
        console.error('Video player initialization error:', error);
        onError?.(error);
      }
    });

    const { isPlaying } = useEvent(player, 'playingChange', {
      isPlaying: player?.playing || false,
    });

    // --- !! EFFECT UPDATED TO RESPECT isSeeking STATE !! ---
    useEffect(() => {
      const interval = setInterval(() => {
        // Only update time from player if the user is not actively seeking
        if (player && !isSeeking) {
          const time = player.currentTime || 0;
          const dur = player.duration || 0;
          setCurrentTime(time);
          if (dur > 0) setDuration(dur);

          if (dur > 0 && time >= dur - 0.25 && !loop) setIsVideoEnded(true);
          else setIsVideoEnded(false);

          const activeSubtitle = subtitles.find(
            (s) => time >= s.start && time <= s.end
          );
          setCurrentSubtitle(activeSubtitle?.text || '');

          onPlaybackStatusUpdate?.({
            currentTime: time,
            duration: dur,
            isPlaying: player.playing,
          });
        }
      }, 250);

      return () => clearInterval(interval);
    }, [player, subtitles, onPlaybackStatusUpdate, loop, isSeeking]);

    const controlsAnimatedStyle = useAnimatedStyle(() => ({
      opacity: controlsOpacity.value,
    }));

    const playIconAnimatedStyle = useAnimatedStyle(() => ({
      opacity: playIconOpacity.value,
    }));

    const showControls = useCallback(() => {
      setShowCustomControls(true);
      controlsOpacity.value = withTiming(1, { duration: 200 });

      if (hideControlsTimeout.current)
        clearTimeout(hideControlsTimeout.current);
      if (isPlaying) {
        // Only hide controls if video is playing
        hideControlsTimeout.current = setTimeout(hideControls, 3000);
      }
    }, [controlsOpacity, isPlaying]);

    const hideControls = useCallback(() => {
      controlsOpacity.value = withTiming(0, { duration: 200 }, (isFinished) => {
        if (isFinished) runOnJS(setShowCustomControls)(false);
      });
    }, [controlsOpacity]);

    const showPlayIconAnimation = useCallback(() => {
      setShowPlayIcon(true);
      playIconOpacity.value = withTiming(1, { duration: 200 });

      if (hidePlayIconTimeout.current)
        clearTimeout(hidePlayIconTimeout.current);
      hidePlayIconTimeout.current = setTimeout(() => {
        playIconOpacity.value = withTiming(
          0,
          { duration: 200 },
          (isFinished) => {
            if (isFinished) runOnJS(setShowPlayIcon)(false);
          }
        );
      }, 1000);
    }, [playIconOpacity]);

    const handleSingleTap = useCallback(() => {
      if (!player) return;
      if (isVideoEnded) {
        player.currentTime = 0;
        player.play();
        setIsVideoEnded(false);
      } else {
        player.playing ? player.pause() : player.play();
      }
      showPlayIconAnimation();
      showControls();
    }, [player, isVideoEnded, showControls, showPlayIconAnimation]);

    const handleLeftDoubleTap = useCallback(() => {
      if (player) {
        player.seekBy(-seekBy);
        showControls();
      }
    }, [player, showControls, seekBy]);

    const handleRightDoubleTap = useCallback(() => {
      if (player) {
        player.seekBy(seekBy);
        showControls();
      }
    }, [player, showControls, seekBy]);

    const toggleMute = useCallback(() => {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      player.muted = newMuted;
    }, [isMuted, player]);

    const handleProgressChange = useCallback(
      (progress: number) => {
        if (!player || !duration || duration <= 0) return;
        const newTime = progress * duration;
        // This is the "optimistic update" - we set the local state immediately
        setCurrentTime(newTime);
        player.currentTime = newTime;
        if (isVideoEnded) setIsVideoEnded(false);
        // Reset the hide controls timer
        if (hideControlsTimeout.current)
          clearTimeout(hideControlsTimeout.current);
        hideControlsTimeout.current = setTimeout(hideControls, 3000);
      },
      [player, duration, isVideoEnded, hideControls]
    );

    const handleSeekStart = useCallback(() => {
      setIsSeeking(true);
      if (hideControlsTimeout.current)
        clearTimeout(hideControlsTimeout.current);
    }, []);

    const handleSeekEnd = useCallback(() => {
      setIsSeeking(false);
    }, []);

    useEffect(() => {
      return () => {
        if (hideControlsTimeout.current)
          clearTimeout(hideControlsTimeout.current);
        if (hidePlayIconTimeout.current)
          clearTimeout(hidePlayIconTimeout.current);
      };
    }, []);

    return (
      <GestureHandlerRootView
        style={[styles.container, { backgroundColor: cardColor }, style]}
      >
        <VideoView
          ref={ref}
          player={player}
          style={styles.video}
          allowsFullscreen={allowsFullscreen}
          allowsPictureInPicture={allowsPictureInPicture}
          nativeControls={false}
          contentFit={contentFit}
          onFullscreenEnter={() => onFullscreenUpdate?.(true)}
          onFullscreenExit={() => onFullscreenUpdate?.(false)}
          {...props}
        />
        <View style={styles.gestureOverlay}>
          <TouchableOpacity
            style={styles.gestureArea}
            onPress={handleLeftDoubleTap}
            activeOpacity={0}
          />
          <TouchableOpacity
            style={styles.gestureAreaCenter}
            onPress={handleSingleTap}
            activeOpacity={0}
          />
          <TouchableOpacity
            style={styles.gestureArea}
            onPress={handleRightDoubleTap}
            activeOpacity={0}
          />
        </View>

        {showCustomControls && (
          <Animated.View
            style={[styles.controlsContainer, controlsAnimatedStyle]}
            pointerEvents='box-none'
          >
            <View style={styles.topControls}>
              <TouchableOpacity
                onPress={toggleMute}
                style={styles.controlButton}
                activeOpacity={0.7}
              >
                {isMuted ? (
                  <VolumeX size={24} color={textColor} />
                ) : (
                  <Volume2 size={24} color={textColor} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.bottomControls}>
              <View style={styles.timeContainer}>
                <Text style={[styles.timeText, { color: mutedColor }]}>
                  {formatTime(currentTime)}
                </Text>
                <Text style={[styles.timeText, { color: mutedColor }]}>
                  {formatTime(duration)}
                </Text>
              </View>

              <ReanimatedProgress
                duration={duration}
                currentTime={currentTime}
                onSeek={handleProgressChange}
                onSeekStart={handleSeekStart}
                onSeekEnd={handleSeekEnd}
              />
            </View>
          </Animated.View>
        )}
      </GestureHandlerRootView>
    );
  }
);

Video.displayName = 'Video';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gestureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  gestureArea: { flex: 1, backgroundColor: 'transparent' },
  gestureAreaCenter: { flex: 2, backgroundColor: 'transparent' },
  centerPlayIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    zIndex: 100,
  },
  centerPlayIconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  bottomControls: { padding: 16, gap: 6, paddingBottom: 6 },
  timeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  timeText: { fontSize: 12 },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
const progressStyles = StyleSheet.create({
  container: { height: THUMB_SIZE * 2, justifyContent: 'center' },
  track: {
    height: PROGRESS_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: PROGRESS_HEIGHT / 2,
  },
  progress: {
    height: PROGRESS_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: PROGRESS_HEIGHT / 2,
    position: 'absolute',
  },
  thumbContainer: {
    position: 'absolute',
    top: (THUMB_SIZE * 2 - THUMB_SIZE) / 2,
    left: -THUMB_SIZE / 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
  },
});

export type { VideoProps, VideoRef, VideoSource };
