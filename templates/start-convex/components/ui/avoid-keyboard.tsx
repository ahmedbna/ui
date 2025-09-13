import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = { offset?: number; duration?: number };

export const AvoidKeyboard = ({ offset = 0, duration = 0 }: Props) => {
  const { keyboardHeight, isKeyboardVisible, keyboardAnimationDuration } =
    useKeyboardHeight();

  // Shared value for the keyboard padding animation
  const keyboardValue = useSharedValue(0);

  // Update the shared value when keyboard height changes
  useEffect(() => {
    // Use different easing for show vs hide to match native behavior
    const easing = isKeyboardVisible
      ? Easing.out(Easing.quad) // Smooth out for keyboard show
      : Easing.in(Easing.quad); // Smooth in for keyboard hide

    // Only add offset when keyboard is visible
    const targetHeight = isKeyboardVisible ? keyboardHeight + offset : 0;

    keyboardValue.value = withTiming(targetHeight, {
      duration: keyboardAnimationDuration + duration,
      easing,
    });
  }, [
    keyboardHeight,
    keyboardAnimationDuration,
    isKeyboardVisible,
    offset,
    duration,
  ]);

  // Animated style
  const keyboardMargin = useAnimatedStyle(() => {
    return {
      height: keyboardValue.value,
    };
  });

  return <Animated.View style={keyboardMargin} />;
};
