import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface HelloWaveProps {
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const sizeVariants = {
  sm: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: -4,
  },
  md: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
  lg: {
    fontSize: 36,
    lineHeight: 40,
    marginTop: -8,
  },
};

export function HelloWave({ children = '👋', size = 'md' }: HelloWaveProps) {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      4 // Run the animation 4 times
    );
  }, [rotationAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotationAnimation.value}deg`,
      },
    ],
  }));

  const sizeStyle = sizeVariants[size];

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={animatedStyle}>
        {typeof children === 'string' ? (
          <Text style={sizeStyle}>{children}</Text>
        ) : (
          children
        )}
      </Animated.View>
    </View>
  );
}
