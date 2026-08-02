import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { HEIGHT } from '@/theme/globals';
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ProgressProps {
  value: number; // 0-100
  style?: ViewStyle;
  height?: number;
  onValueChange?: (value: number) => void;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  interactive?: boolean;
  /** Amount to adjust by per accessibility increment/decrement action */
  step?: number;
}

export function Progress({
  value,
  style,
  height = HEIGHT,
  onValueChange,
  onSeekStart,
  onSeekEnd,
  interactive = false,
  step = 10,
}: ProgressProps) {
  const primaryColor = useColor('primary');
  const mutedColor = useColor('muted');

  const clampedValue = Math.max(0, Math.min(100, value));
  const progressWidth = useSharedValue(clampedValue);
  const containerWidth = useSharedValue(200); // Default width, will be updated
  const isDragging = useSharedValue(false);

  // Update animation when value prop changes (only if not dragging)
  useEffect(() => {
    if (!isDragging.value) {
      progressWidth.value = withTiming(clampedValue, { duration: 300 });
    }
  }, [clampedValue]);

  const updateValue = (newValue: number) => {
    const clamped = Math.max(0, Math.min(100, newValue));
    onValueChange?.(clamped);
  };

  const handleAccessibilityAction = (event: {
    nativeEvent: { actionName: string };
  }) => {
    if (!interactive) return;
    switch (event.nativeEvent.actionName) {
      case 'increment':
        updateValue(clampedValue + step);
        break;
      case 'decrement':
        updateValue(clampedValue - step);
        break;
    }
  };

  const handleSeekStart = () => {
    isDragging.value = true;
    onSeekStart?.();
  };

  const handleSeekEnd = () => {
    isDragging.value = false;
    onSeekEnd?.();
  };

  // Create pan gesture using the new Gesture API
  const panGesture = Gesture.Pan()
    .onStart(() => {
      if (!interactive) return;
      runOnJS(handleSeekStart)();
    })
    .onUpdate((event) => {
      if (!interactive) return;

      // Calculate new progress based on gesture position
      const newProgress = (event.x / containerWidth.value) * 100;
      const clampedProgress = Math.max(0, Math.min(100, newProgress));

      progressWidth.value = clampedProgress;
      runOnJS(updateValue)(clampedProgress);
    })
    .onEnd(() => {
      if (!interactive) return;
      runOnJS(handleSeekEnd)();
    });

  // Create tap gesture for direct seeking
  const tapGesture = Gesture.Tap().onStart((event) => {
    if (!interactive) return;

    runOnJS(handleSeekStart)();

    // Calculate progress based on tap position
    const newProgress = (event.x / containerWidth.value) * 100;
    const clampedProgress = Math.max(0, Math.min(100, newProgress));

    progressWidth.value = withTiming(clampedProgress, { duration: 200 });
    runOnJS(updateValue)(clampedProgress);

    setTimeout(() => {
      runOnJS(handleSeekEnd)();
    }, 200);
  });

  // Combine gestures
  const combinedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const containerStyle: ViewStyle[] = [
    {
      height: height,
      width: '100%' as const,
      backgroundColor: mutedColor,
      borderRadius: height / 2,
      overflow: 'hidden' as const,
    },
    ...(style ? [style] : []),
  ];

  const onLayout = (event: any) => {
    containerWidth.value = event.nativeEvent.layout.width;
  };

  if (interactive) {
    return (
      <GestureDetector gesture={combinedGesture}>
        <Animated.View
          style={containerStyle}
          onLayout={onLayout}
          accessible
          accessibilityRole='adjustable'
          accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
          accessibilityActions={[
            { name: 'increment', label: 'increment' },
            { name: 'decrement', label: 'decrement' },
          ]}
          onAccessibilityAction={handleAccessibilityAction}
        >
          <Animated.View
            style={[
              {
                height: '100%' as const,
                backgroundColor: primaryColor,
                borderRadius: height / 2,
              },
              animatedProgressStyle,
            ]}
          />
        </Animated.View>
      </GestureDetector>
    );
  }

  return (
    <View
      style={containerStyle}
      onLayout={onLayout}
      accessible
      accessibilityRole='progressbar'
      accessibilityValue={{ min: 0, max: 100, now: clampedValue }}
    >
      <Animated.View
        style={[
          {
            height: '100%' as const,
            backgroundColor: primaryColor,
            borderRadius: height / 2,
          },
          animatedProgressStyle,
        ]}
      />
    </View>
  );
}
