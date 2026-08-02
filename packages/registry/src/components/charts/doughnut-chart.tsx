import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedSliceProps = {
  d: string;
  fill: string;
  animationProgress: SharedValue<number>;
  // A single 100%-share slice makes the arc's start/end points coincide,
  // which SVG's arc command can't draw — render a stroked ring instead.
  fullRing?: {
    cx: number;
    cy: number;
    meanRadius: number;
    strokeWidth: number;
  };
};

// Per-item hook must live in its own mounted subcomponent, not in the
// parent's .map() body — calling useAnimatedProps per loop iteration
// violates Rules of Hooks the moment data.length changes.
const AnimatedSlice = React.memo(
  ({ d, fill, animationProgress, fullRing }: AnimatedSliceProps) => {
    const sliceAnimatedProps = useAnimatedProps(() => ({
      opacity: animationProgress.value,
    }));

    if (fullRing) {
      return (
        <AnimatedCircle
          cx={fullRing.cx}
          cy={fullRing.cy}
          r={fullRing.meanRadius}
          fill='none'
          stroke={fill}
          strokeWidth={fullRing.strokeWidth}
          animatedProps={sliceAnimatedProps}
        />
      );
    }

    return (
      <AnimatedPath d={d} fill={fill} animatedProps={sliceAnimatedProps} />
    );
  }
);

interface ChartConfig {
  width?: number;
  height?: number;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
  innerRadius?: number;
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

export const DoughnutChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    showLabels = true,
    animated = true,
    duration = 1000,
    innerRadius = 0.5, // Default inner radius as ratio of outer radius
  } = config;

  const chartWidth = containerWidth || config.width || 300;

  const primaryColor = useColor('primary');

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

  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;

  const outerRadius = Math.min(chartWidth, height) / 2 - 20;
  const clampedInnerRadius = Math.max(0, Math.min(0.95, innerRadius));
  const innerRadiusValue = outerRadius * clampedInnerRadius;
  const centerX = chartWidth / 2;
  const centerY = height / 2;

  let currentAngle = -Math.PI / 2;

  const colors = [
    primaryColor,
    useColor('blue'),
    useColor('green'),
    useColor('orange'),
    useColor('purple'),
    useColor('pink'),
  ];

  return (
    <View
      style={[{ width: '100%' }, style]}
      onLayout={handleLayout}
      accessibilityRole='image'
      accessibilityLabel={`Doughnut chart with ${data.length} slices, total ${Math.round(total)}`}
    >
      <Svg width={chartWidth} height={height}>
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 2 * Math.PI;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;

          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

          // Outer arc points
          const x1 = centerX + outerRadius * Math.cos(startAngle);
          const y1 = centerY + outerRadius * Math.sin(startAngle);
          const x2 = centerX + outerRadius * Math.cos(endAngle);
          const y2 = centerY + outerRadius * Math.sin(endAngle);

          // Inner arc points
          const x3 = centerX + innerRadiusValue * Math.cos(endAngle);
          const y3 = centerY + innerRadiusValue * Math.sin(endAngle);
          const x4 = centerX + innerRadiusValue * Math.cos(startAngle);
          const y4 = centerY + innerRadiusValue * Math.sin(startAngle);

          const pathData = [
            `M ${x1} ${y1}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${innerRadiusValue} ${innerRadiusValue} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
            'Z',
          ].join(' ');

          // Label position
          const labelAngle = startAngle + sliceAngle / 2;
          const labelRadius = (outerRadius + innerRadiusValue) / 2;
          const labelX = centerX + labelRadius * Math.cos(labelAngle);
          const labelY = centerY + labelRadius * Math.sin(labelAngle);

          currentAngle = endAngle;

          // A single slice spanning the full circle (only one item, or every
          // other item has a value of 0) has coincident arc start/end points.
          const isFullCircle = sliceAngle >= 2 * Math.PI - 1e-6;

          return (
            <G key={`slice-${index}`}>
              <AnimatedSlice
                d={pathData}
                fill={item.color || colors[index % colors.length]}
                animationProgress={animationProgress}
                fullRing={
                  isFullCircle
                    ? {
                        cx: centerX,
                        cy: centerY,
                        meanRadius: (outerRadius + innerRadiusValue) / 2,
                        strokeWidth: outerRadius - innerRadiusValue,
                      }
                    : undefined
                }
              />

              {showLabels && (
                <SvgText
                  x={labelX}
                  y={labelY}
                  textAnchor='middle'
                  fontSize={12}
                  fill='#FFFFFF'
                  fontWeight='600'
                >
                  {Math.round((item.value / total) * 100)}%
                </SvgText>
              )}
            </G>
          );
        })}
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
