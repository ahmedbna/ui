import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS } from '@/theme/globals';
import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

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
  const mutedColor = useThemeColor({}, 'muted');
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any, // Type assertion to bypass the strict typing
          height,
          backgroundColor: mutedColor,
          borderRadius: variant === 'default' ? CORNERS : BORDER_RADIUS,
          opacity,
        },
        style,
      ]}
    />
  );
}
