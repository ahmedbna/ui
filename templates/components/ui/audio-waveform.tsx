import { useColor } from '@/hooks/useColor';
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export interface AudioWaveformProps {
  data?: number[];
  isPlaying?: boolean;
  progress?: number;
  onSeek?: (position: number) => void;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  style?: ViewStyle;
  height?: number;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  activeColor?: string;
  inactiveColor?: string;
  animated?: boolean;
  showProgress?: boolean;
  interactive?: boolean;
}

// FIX: The Bar component now manages its own animation state.
const Bar = React.memo(
  ({
    value,
    height,
    width,
    isActive,
    showProgress,
    activeColor,
    inactiveColor,
    opacity,
    isPlaying,
    animated,
  }: {
    value: number;
    height: number;
    width: number;
    isActive: boolean;
    showProgress: boolean;
    activeColor: string;
    inactiveColor: string;
    opacity: number;
    isPlaying: boolean;
    animated: boolean;
  }) => {
    // Each Bar has its own shared value, created at the top level. This is correct.
    const animatedValue = useSharedValue(value);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          animatedValue.value,
          [0, 1],
          [4, height * 0.9],
          'clamp'
        ),
      };
    });

    // This effect handles animations when the bar's data or playing state changes.
    useEffect(() => {
      if (isPlaying && animated && !showProgress) {
        // "Live" animation effect
        const randomDuration = 200 + Math.random() * 200;
        animatedValue.value = withRepeat(
          withSequence(
            withTiming(value * (0.9 + Math.random() * 0.2), {
              duration: randomDuration,
            }),
            withTiming(value * (0.9 + Math.random() * 0.2), {
              duration: randomDuration,
            })
          ),
          -1,
          true
        );
      } else {
        // Animate to the new static value
        cancelAnimation(animatedValue);
        animatedValue.value = withTiming(value, {
          duration: animated ? 250 : 0,
        });
      }

      return () => {
        cancelAnimation(animatedValue);
      };
    }, [value, isPlaying, animated, showProgress, animatedValue]);

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            width,
            backgroundColor:
              isActive || !showProgress ? activeColor : inactiveColor,
            opacity,
          },
          animatedStyle,
        ]}
      />
    );
  }
);

export function AudioWaveform({
  data,
  isPlaying = false,
  progress = 0,
  onSeek,
  onSeekStart,
  onSeekEnd,
  style,
  height = 60,
  barCount = 50,
  barWidth = 3,
  barGap = 2,
  activeColor,
  inactiveColor,
  animated = true,
  showProgress = false,
  interactive = false,
}: AudioWaveformProps) {
  const primaryColor = useColor('destructive');
  const mutedColor = useColor('textMuted');

  const finalActiveColor = activeColor || primaryColor;
  const finalInactiveColor = inactiveColor || mutedColor;

  // FIX: This now just memoizes the raw data array, not an array of hooks.
  const waveformData = useMemo(
    () => data || generateSampleWaveform(barCount),
    [data, barCount]
  );

  const totalWidth = barCount * barWidth + (barCount - 1) * barGap;

  const getProgressLinePosition = () => {
    const progressRatio = Math.max(0, Math.min(100, progress)) / 100;
    if (progressRatio === 0) return 0;
    if (progressRatio === 1) return totalWidth - 1;
    const exactBarPosition = progressRatio * barCount;
    const barIndex = Math.floor(exactBarPosition);
    const barProgress = exactBarPosition - barIndex;
    let position = barIndex * (barWidth + barGap);
    position += barProgress * barWidth;
    return Math.min(position, totalWidth - 1);
  };

  const handleSeek = (x: number) => {
    if (!onSeek) return;
    const clampedX = Math.max(0, Math.min(totalWidth, x));
    const seekPercentage = (clampedX / totalWidth) * 100;
    onSeek(seekPercentage);
  };

  const panGesture = Gesture.Pan()
    .enabled(interactive)
    .onStart((event) => {
      if (onSeekStart) runOnJS(onSeekStart)();
      runOnJS(handleSeek)(event.x);
    })
    .onUpdate((event) => {
      runOnJS(handleSeek)(event.x);
    })
    .onEnd(() => {
      if (onSeekEnd) runOnJS(onSeekEnd)();
    });

  return (
    <View style={[styles.container, { height }, style]}>
      <GestureDetector gesture={panGesture}>
        <View style={[styles.waveform, { width: totalWidth }]}>
          {/* FIX: We now map over the data array and pass the value to each Bar */}
          {waveformData.map((value, index) => {
            const progressRatio = progress / 100;
            const barProgress = (index + 0.5) / barCount;
            const isActive = showProgress
              ? barProgress <= progressRatio
              : false;

            let opacity = 1;
            if (showProgress && barProgress > progressRatio) {
              const distanceFromProgress = barProgress - progressRatio;
              opacity = Math.max(0.3, 1 - distanceFromProgress * 2);
            }

            return (
              <View
                key={index}
                style={[
                  styles.barContainer,
                  {
                    width: barWidth,
                    marginRight: index < barCount - 1 ? barGap : 0,
                  },
                ]}
              >
                <Bar
                  value={value}
                  height={height}
                  width={barWidth}
                  isActive={isActive}
                  showProgress={showProgress}
                  activeColor={finalActiveColor}
                  inactiveColor={finalInactiveColor}
                  opacity={opacity}
                  isPlaying={isPlaying}
                  animated={animated}
                />
              </View>
            );
          })}
          {showProgress && (
            <View
              style={[
                styles.progressLine,
                {
                  left: getProgressLinePosition(),
                  height: height * 0.95,
                  backgroundColor: finalActiveColor,
                },
              ]}
            />
          )}
        </View>
      </GestureDetector>
    </View>
  );
}

// Helper function remains the same
function generateSampleWaveform(barCount: number): number[] {
  return Array.from({ length: barCount }, (_, i) => {
    const wave1 = Math.sin((i / barCount) * Math.PI * 4) * 0.3;
    const wave2 = Math.sin((i / barCount) * Math.PI * 8) * 0.15;
    const wave3 = Math.sin((i / barCount) * Math.PI * 2) * 0.2;
    const noise = (Math.random() - 0.5) * 0.2;
    const base = 0.4;
    const peak = Math.random() < 0.1 ? Math.random() * 0.3 : 0;
    return Math.max(
      0.1,
      Math.min(0.95, base + wave1 + wave2 + wave3 + noise + peak)
    );
  });
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  barContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bar: {
    borderRadius: 1.5,
    minHeight: 4,
  },
  progressLine: {
    position: 'absolute',
    width: 2,
    borderRadius: 1,
    opacity: 0.9,
    top: '2.5%',
    zIndex: 10,
  },
});
