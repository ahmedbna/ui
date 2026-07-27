import { Button, ButtonSize, ButtonVariant } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useModeToggle } from '@/hooks/useModeToggle';
import { Moon, Sun } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const ModeToggle = ({ variant = 'outline', size = 'icon' }: Props) => {
  const { toggleMode, isDark } = useModeToggle();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const [showIcon, setShowIcon] = useState<'sun' | 'moon'>(
    isDark ? 'moon' : 'sun'
  );

  useEffect(() => {
    // Animate icon change
    scale.value = withTiming(0, { duration: 150 }, () => {
      runOnJS(setShowIcon)(isDark ? 'moon' : 'sun');
      scale.value = withTiming(1, { duration: 150 });
    });

    // Only rotate when switching to sun (sun rays spinning effect)
    if (!isDark) {
      rotation.value = withTiming(rotation.value + 180, { duration: 300 });
    }
  }, [isDark]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: showIcon === 'sun' ? `${rotation.value}deg` : '0deg' },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Button variant={variant} size={size} onPress={toggleMode}>
      <Animated.View style={animatedStyle}>
        <Icon name={showIcon === 'moon' ? Moon : Sun} size={24} />
      </Animated.View>
    </Button>
  );
};
