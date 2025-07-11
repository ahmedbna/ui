import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ChartConfig {
  width?: number;
  height?: number;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
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

export const PolarAreaChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    showLabels = true,
    animated = true,
    duration = 1000,
  } = config;

  const chartWidth = containerWidth || config.width || 300;

  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'mutedForeground');

  const animationProgress = useSharedValue(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    if (measuredWidth > 0) {
      setContainerWidth(measuredWidth);
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

  const centerX = chartWidth / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(chartWidth, height) / 2 - 20;
  const maxValue = Math.max(...data.map((d) => d.value));

  const angleStep = (2 * Math.PI) / data.length;

  const colors = [
    primaryColor,
    useThemeColor({}, 'blue'),
    useThemeColor({}, 'green'),
    useThemeColor({}, 'orange'),
    useThemeColor({}, 'purple'),
    useThemeColor({}, 'pink'),
  ];

  return (
    <View style={[{ width: '100%', height }, style]} onLayout={handleLayout}>
      <Svg width={chartWidth} height={height}>
        {data.map((item, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const nextAngle = (index + 1) * angleStep - Math.PI / 2;
          const radius = (item.value / maxValue) * maxRadius;

          const x1 = centerX + radius * Math.cos(angle);
          const y1 = centerY + radius * Math.sin(angle);
          const x2 = centerX + radius * Math.cos(nextAngle);
          const y2 = centerY + radius * Math.sin(nextAngle);

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 0 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');

          // Label position
          const labelAngle = angle + angleStep / 2;
          const labelRadius = radius * 0.7;
          const labelX = centerX + labelRadius * Math.cos(labelAngle);
          const labelY = centerY + labelRadius * Math.sin(labelAngle);

          const sliceAnimatedProps = useAnimatedProps(() => ({
            opacity: animationProgress.value * 0.8,
          }));

          return (
            <G key={`slice-${index}`}>
              <AnimatedPath
                d={pathData}
                fill={item.color || colors[index % colors.length]}
                stroke='white'
                strokeWidth={1}
                animatedProps={sliceAnimatedProps}
              />

              {showLabels && (
                <SvgText
                  x={labelX}
                  y={labelY}
                  textAnchor='middle'
                  fontSize={10}
                  fill='#FFFFFF'
                  fontWeight='600'
                  alignmentBaseline='middle'
                >
                  {item.value}
                </SvgText>
              )}
            </G>
          );
        })}

        {/* Grid circles for reference */}
        {[0.25, 0.5, 0.75, 1].map((ratio, index) => (
          <Circle
            key={`grid-${index}`}
            cx={centerX}
            cy={centerY}
            r={maxRadius * ratio}
            stroke={mutedColor}
            strokeWidth={0.5}
            fill='none'
            opacity={0.2}
          />
        ))}
      </Svg>

      {/* Legend */}
      <View style={{ marginTop: 10 }}>
        {data.map((item, index) => (
          <View
            key={`legend-${index}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.color || colors[index % colors.length],
                marginRight: 8,
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
