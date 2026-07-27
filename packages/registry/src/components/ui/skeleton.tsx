import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS, CORNERS } from '@/theme/globals';
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: ViewStyle;
  variant?: 'default' | 'rounded';
}

export function Skeleton({
  width = '100%',
  height = 100,
  style,
  variant = 'default',
}: SkeletonProps) {
  const mutedColor = useColor('muted');
  // Start the opacity at its lowest point
  const opacity = useSharedValue(0.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    // We only define the animation going from 0.5 -> 1.
    // The `withRepeat` function will handle reversing it automatically.
    opacity.value = withRepeat(
      // Animate to an opacity of 1
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      }),
      -1, // Loop infinitely
      true // Set to true to automatically reverse the animation (yoyo effect)
    );
  }, []); // Use an empty dependency array as the shared value object is stable

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          backgroundColor: mutedColor,
          borderRadius: variant === 'default' ? CORNERS : BORDER_RADIUS,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}
