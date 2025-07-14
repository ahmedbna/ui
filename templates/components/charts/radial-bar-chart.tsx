import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
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
  padding?: number;
  animated?: boolean;
  duration?: number;
  gradient?: boolean;
}

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

type Props = {
  data: ChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const RadialBarChart = ({ data, config = {}, style }: Props) => {
  const [containerSize, setContainerSize] = useState(200);

  const {
    padding = 20,
    animated = true,
    duration = 1000,
    gradient = false,
  } = config;

  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'mutedForeground');

  const animationProgress = useSharedValue(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const size = Math.min(width, height);
    if (size > 0) {
      setContainerSize(size);
    }
  };

  useEffect(() => {
    if (animated) {
      animationProgress.value = withTiming(1, { duration });
    } else {
      animationProgress.value = 1;
    }
  }, [data, animated, duration]);

  if (!data.length) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const size = containerSize || 200;
  const center = size / 2;
  const maxRadius = (size - padding * 2) / 2;
  const strokeWidth = maxRadius / (data.length + 1);

  const colors = [
    primaryColor,
    useThemeColor({}, 'blue'),
    useThemeColor({}, 'green'),
    useThemeColor({}, 'orange'),
    useThemeColor({}, 'purple'),
    useThemeColor({}, 'pink'),
  ];

  return (
    <View style={[{ width: '100%' }, style]}>
      <View
        style={{
          width: '100%',
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onLayout={handleLayout}
      >
        <Svg width={size} height={size}>
          <Defs>
            {gradient &&
              data.map((item, index) => (
                <LinearGradient
                  key={`gradient-${index}`}
                  id={`radialGradient-${index}`}
                  x1='0%'
                  y1='0%'
                  x2='100%'
                  y2='0%'
                >
                  <Stop
                    offset='0%'
                    stopColor={item.color || colors[index % colors.length]}
                    stopOpacity='0.3'
                  />
                  <Stop
                    offset='100%'
                    stopColor={item.color || colors[index % colors.length]}
                    stopOpacity='1'
                  />
                </LinearGradient>
              ))}
          </Defs>

          {data.map((item, index) => {
            const radius = maxRadius - index * strokeWidth - strokeWidth / 2;
            const circumference = 2 * Math.PI * radius;
            const progressRatio = item.value / maxValue;

            const circleAnimatedProps = useAnimatedProps(() => {
              const animatedProgress = animationProgress.value * progressRatio;
              const strokeDashoffset =
                circumference - animatedProgress * circumference;

              return {
                strokeDashoffset,
              };
            });

            return (
              <AnimatedCircle
                key={`radial-${index}`}
                cx={center}
                cy={center}
                r={radius}
                stroke={
                  gradient
                    ? `url(#radialGradient-${index})`
                    : item.color || colors[index % colors.length]
                }
                strokeWidth={strokeWidth * 0.8}
                fill='none'
                strokeLinecap='round'
                strokeDasharray={circumference}
                transform={`rotate(-90 ${center} ${center})`}
                animatedProps={circleAnimatedProps}
              />
            );
          })}

          {/* Center values */}
          {data.length > 0 && (
            <>
              <SvgText
                x={center}
                y={center - 5}
                textAnchor='middle'
                fontSize={16}
                fill={primaryColor}
                fontWeight='bold'
              >
                {data.reduce((sum, item) => sum + item.value, 0)}
              </SvgText>
              <SvgText
                x={center}
                y={center + 15}
                textAnchor='middle'
                fontSize={12}
                fill={mutedColor}
              >
                Total
              </SvgText>
            </>
          )}
        </Svg>
      </View>

      {/* Legend */}
      <View style={{ marginTop: 15 }}>
        {data.map((item, index) => (
          <View
            key={`legend-${index}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.color || colors[index % colors.length],
                marginRight: 10,
              }}
            />
            <Text variant='caption'>
              {item.label}: {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
