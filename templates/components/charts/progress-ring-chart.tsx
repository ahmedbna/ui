import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

// Animated SVG Components
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ChartConfig {
  animated?: boolean;
  duration?: number;
  gradient?: boolean;
}

type Props = {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  config?: ChartConfig;
  style?: ViewStyle;
  showLabel?: boolean;
  label?: string;
  centerText?: string;
};

export const ProgressRingChart = ({
  progress,
  size = 120,
  strokeWidth = 8,
  config = {},
  style,
  showLabel = true,
  label,
  centerText,
}: Props) => {
  const { animated = true, duration = 1000, gradient = false } = config;

  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'mutedForeground');

  const animationProgress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animationProgress.value = withTiming(1, { duration });
    } else {
      animationProgress.value = 1;
    }
  }, [progress, animated, duration]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const progressAnimatedProps = useAnimatedProps(() => {
    const animatedProgress = animationProgress.value * (progress / 100);
    const strokeDashoffset = circumference - animatedProgress * circumference;

    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      {showLabel && label && (
        <SvgText
          x={center}
          y={20}
          textAnchor='middle'
          fontSize={14}
          fill={mutedColor}
          fontWeight='600'
        >
          {label}
        </SvgText>
      )}

      <Svg width={size} height={size}>
        <Defs>
          {gradient && (
            <LinearGradient
              id='progressGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <Stop offset='0%' stopColor={primaryColor} stopOpacity='0.3' />
              <Stop offset='100%' stopColor={primaryColor} stopOpacity='1' />
            </LinearGradient>
          )}
        </Defs>

        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={mutedColor}
          strokeWidth={strokeWidth}
          fill='none'
          opacity={0.2}
        />

        {/* Progress circle */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={gradient ? 'url(#progressGradient)' : primaryColor}
          strokeWidth={strokeWidth}
          fill='none'
          strokeLinecap='round'
          strokeDasharray={circumference}
          transform={`rotate(-90 ${center} ${center})`}
          animatedProps={progressAnimatedProps}
        />

        {/* Center text */}
        {centerText && (
          <SvgText
            x={center}
            y={center + 6}
            textAnchor='middle'
            fontSize={18}
            fill={primaryColor}
            fontWeight='bold'
          >
            {centerText}
          </SvgText>
        )}

        {/* Progress percentage */}
        {!centerText && (
          <SvgText
            x={center}
            y={center + 6}
            textAnchor='middle'
            fontSize={16}
            fill={primaryColor}
            fontWeight='600'
          >
            {Math.round(progress)}%
          </SvgText>
        )}
      </Svg>
    </View>
  );
};
