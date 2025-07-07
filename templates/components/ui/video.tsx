import { Progress } from '@/components/ui/progress';
import { useThemeColor } from '@/hooks/useThemeColor';
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
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

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
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Main Video Component
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
    // Theme colors
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({}, 'card');
    const mutedColor = useThemeColor({}, 'mutedForeground');

    // State
    const [showCustomControls, setShowCustomControls] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(muted);
    const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [showPlayIcon, setShowPlayIcon] = useState(false);

    // Refs
    const controlsOpacity = useRef(new Animated.Value(0)).current;
    const playIconOpacity = useRef(new Animated.Value(0)).current;
    const hideControlsTimeout = useRef<number | null>(null);
    const hidePlayIconTimeout = useRef<number | null>(null);

    // Create video player
    const player = useVideoPlayer(source, (player) => {
      try {
        console.log('Initializing video player');
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

    // Update current time and handle subtitles
    useEffect(() => {
      const interval = setInterval(() => {
        try {
          if (player) {
            const time = player.currentTime || 0;
            const dur = player.duration || 0;
            setCurrentTime(time);
            setDuration(dur);

            // Check if video ended
            if (dur > 0 && time >= dur && !loop) {
              setIsVideoEnded(true);
            } else {
              setIsVideoEnded(false);
            }

            // Handle subtitles
            const activeSubtitle = subtitles.find(
              (subtitle) => time >= subtitle.start && time <= subtitle.end
            );
            setCurrentSubtitle(activeSubtitle?.text || '');

            onPlaybackStatusUpdate?.({
              currentTime: time,
              duration: dur,
              isPlaying: player.playing,
            });
          }
        } catch (error) {
          console.error('Video playback status update error:', error);
        }
      }, 100);

      return () => clearInterval(interval);
    }, [player, subtitles, onPlaybackStatusUpdate, loop]);

    // Show/hide controls
    const showControls = useCallback(() => {
      setShowCustomControls(true);
      Animated.timing(controlsOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Clear existing timeout
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }

      // Hide controls after 3 seconds
      hideControlsTimeout.current = setTimeout(() => {
        hideControls();
      }, 3000);
    }, [controlsOpacity]);

    const hideControls = useCallback(() => {
      Animated.timing(controlsOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowCustomControls(false);
      });
    }, [controlsOpacity]);

    // Show play icon animation
    const showPlayIconAnimation = useCallback(() => {
      setShowPlayIcon(true);
      Animated.timing(playIconOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Clear existing timeout
      if (hidePlayIconTimeout.current) {
        clearTimeout(hidePlayIconTimeout.current);
      }

      // Hide play icon after 1 second
      hidePlayIconTimeout.current = setTimeout(() => {
        Animated.timing(playIconOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setShowPlayIcon(false);
        });
      }, 1000);
    }, [playIconOpacity]);

    // Handle single tap (play/pause)
    const handleSingleTap = useCallback(() => {
      try {
        if (!player) {
          console.error('Player not available');
          return;
        }

        if (isVideoEnded) {
          // Restart video from beginning
          player.currentTime = 0;
          if (player.play) {
            player.play();
          }
          setIsVideoEnded(false);
        } else if (isPlaying) {
          if (player.pause) {
            player.pause();
          }
        } else {
          if (player.play) {
            player.play();
          }
        }
        showPlayIconAnimation();
        showControls();
      } catch (error) {
        console.error('Single tap handler error:', error);
      }
    }, [isPlaying, player, showControls, showPlayIconAnimation, isVideoEnded]);

    // Handle double tap left (seek backward)
    const handleLeftDoubleTap = useCallback(() => {
      try {
        if (player && player.seekBy) {
          player.seekBy(-seekBy);
          showControls();
        }
      } catch (error) {
        console.error('Left double tap handler error:', error);
        // Fallback: try direct currentTime manipulation
        try {
          if (player) {
            const newTime = Math.max(0, currentTime - seekBy);
            player.currentTime = newTime;
            showControls();
          }
        } catch (fallbackError) {
          console.error('Fallback seek error:', fallbackError);
        }
      }
    }, [player, showControls, currentTime]);

    // Handle double tap right (seek forward)
    const handleRightDoubleTap = useCallback(() => {
      try {
        if (player && player.seekBy) {
          player.seekBy(seekBy);
          showControls();
        }
      } catch (error) {
        console.error('Right double tap handler error:', error);
        // Fallback: try direct currentTime manipulation
        try {
          if (player && duration > 0) {
            const newTime = Math.min(duration, currentTime + seekBy);
            player.currentTime = newTime;
            showControls();
          }
        } catch (fallbackError) {
          console.error('Fallback seek error:', fallbackError);
        }
      }
    }, [player, showControls, currentTime, duration]);

    // Toggle mute
    const toggleMute = useCallback(() => {
      try {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        player.muted = newMuted;
      } catch (error) {
        console.error('Toggle mute error:', error);
      }
    }, [isMuted, player]);

    // Handle progress change
    const handleProgressChange = useCallback(
      (value: number) => {
        try {
          if (!player || !duration || duration <= 0) {
            console.log('Cannot seek: player or duration not available');
            return;
          }
          const newTime = (value / 100) * duration;
          player.currentTime = newTime;
          setCurrentTime(newTime);
          if (isVideoEnded) {
            setIsVideoEnded(false);
          }
          showControls();
        } catch (error) {
          console.error('Progress change error:', error);
        }
      },
      [player, duration, isVideoEnded, showControls]
    );

    // Handle progress bar press
    const handleProgressPress = useCallback(
      (event: any) => {
        try {
          const { locationX } = event.nativeEvent;
          const { width } = event.currentTarget.getBoundingClientRect?.() || {
            width: 300,
          };
          const percentage = (locationX / width) * 100;
          handleProgressChange(Math.max(0, Math.min(100, percentage)));
        } catch (error) {
          console.error('Progress press error:', error);
        }
      },
      [handleProgressChange]
    );

    // Create simple tap handlers without complex gestures
    const handleTapPress = useCallback(() => {
      handleSingleTap();
    }, [handleSingleTap]);

    const handleLeftTapPress = useCallback(() => {
      handleLeftDoubleTap();
    }, [handleLeftDoubleTap]);

    const handleRightTapPress = useCallback(() => {
      handleRightDoubleTap();
    }, [handleRightDoubleTap]);

    // Cleanup
    useEffect(() => {
      return () => {
        if (hideControlsTimeout.current) {
          clearTimeout(hideControlsTimeout.current);
        }
        if (hidePlayIconTimeout.current) {
          clearTimeout(hidePlayIconTimeout.current);
        }
      };
    }, []);

    return (
      <View style={[styles.container, { backgroundColor: cardColor }, style]}>
        {nativeControls ? (
          <VideoView
            ref={ref}
            player={player}
            style={styles.video}
            allowsFullscreen={allowsFullscreen}
            allowsPictureInPicture={allowsPictureInPicture}
            nativeControls={nativeControls}
            contentFit={contentFit}
            onFullscreenEnter={() => onFullscreenUpdate?.(true)}
            onFullscreenExit={() => onFullscreenUpdate?.(false)}
            {...props}
          />
        ) : (
          <>
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

            {/* Touch overlay for gestures */}
            <View style={styles.gestureOverlay}>
              {/* Left side - tap to seek backward */}
              <TouchableOpacity
                style={styles.gestureArea}
                onPress={handleLeftTapPress}
                activeOpacity={1}
              />

              {/* Center - tap to play/pause */}
              <TouchableOpacity
                style={styles.gestureAreaCenter}
                onPress={handleTapPress}
                activeOpacity={1}
              />

              {/* Right side - tap to seek forward */}
              <TouchableOpacity
                style={styles.gestureArea}
                onPress={handleRightTapPress}
                activeOpacity={1}
              />
            </View>

            {/* Center Play/Pause Icon */}
            {showPlayIcon && (
              <Animated.View
                style={[styles.centerPlayIcon, { opacity: playIconOpacity }]}
                pointerEvents='none'
              >
                <View style={styles.centerPlayIconBackground}>
                  {isPlaying ? (
                    <Pause size={48} color={textColor} />
                  ) : (
                    <Play size={48} color={textColor} />
                  )}
                </View>
              </Animated.View>
            )}

            {/* Subtitles */}
            {currentSubtitle && (
              <View style={styles.subtitleContainer} pointerEvents='none'>
                <Text style={[styles.subtitleText, { color: textColor }]}>
                  {currentSubtitle}
                </Text>
              </View>
            )}

            {/* Custom Controls */}
            {showCustomControls && (
              <Animated.View
                style={[styles.controlsContainer, { opacity: controlsOpacity }]}
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

                  <Progress
                    height={10}
                    interactive={true}
                    value={duration > 0 ? (currentTime / duration) * 100 : 0}
                    onValueChange={handleProgressPress}
                  />
                </View>
              </Animated.View>
            )}
          </>
        )}
      </View>
    );
  }
);

Video.displayName = 'Video';

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Changed from flex: 1
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
  gestureArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  gestureAreaCenter: {
    flex: 2,
    backgroundColor: 'transparent',
  },
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
  bottomControls: {
    padding: 16,
    gap: 6,
    paddingBottom: 6,
  },
  progressSection: {
    marginTop: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

// Export types for consumers
export type { VideoProps, VideoRef, VideoSource };
