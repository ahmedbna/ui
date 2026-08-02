import { useColor } from '@/hooks/useColor';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedVertexProps = {
  cx: number;
  cy: number;
  fill: string;
  index: number;
  animationProgress: SharedValue<number>;
};

// Per-item hook must live in its own mounted subcomponent, not in the
// parent's .map() body — calling useAnimatedProps per loop iteration
// violates Rules of Hooks the moment data.length changes.
const AnimatedVertex = React.memo(
  ({ cx, cy, fill, index, animationProgress }: AnimatedVertexProps) => {
    const pointAnimatedProps = useAnimatedProps(() => ({
      opacity: animationProgress.value,
      r: withDelay(index * 100, withSpring(animationProgress.value * 4)),
    }));

    return (
      <AnimatedCircle
        cx={cx}
        cy={cy}
        fill={fill}
        animatedProps={pointAnimatedProps}
      />
    );
  }
);

interface ChartConfig {
  width?: number;
  height?: number;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
  maxValue?: number;
}

interface RadarChartDataPoint {
  label: string;
  value: number;
}

type Props = {
  data: RadarChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const RadarChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    showLabels = true,
    animated = true,
    duration = 1000,
    maxValue,
  } = config;

  const chartWidth = containerWidth || config.width || 300;

  const primaryColor = useColor('primary');
  const mutedColor = useColor('mutedForeground');

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
  const radius = Math.min(chartWidth, height) / 2 - 40;
  // `??` (not `||`) so an explicit maxValue={0} isn't silently discarded.
  const maxVal = maxValue ?? Math.max(...data.map((d) => d.value));
  if (maxVal === 0) return null;

  // Calculate points for each data point
  const angleStep = (2 * Math.PI) / data.length;
  const points = data.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const distance = (item.value / maxVal) * radius;
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle),
      labelX: centerX + (radius + 20) * Math.cos(angle),
      labelY: centerY + (radius + 20) * Math.sin(angle),
      label: item.label,
    };
  });

  // Create path for the radar area
  const radarPath =
    points.length > 0
      ? `M${points[0].x},${points[0].y} ` +
        points
          .slice(1)
          .map((p) => `L${p.x},${p.y}`)
          .join(' ') +
        ' Z'
      : '';

  const radarAnimatedProps = useAnimatedProps(() => ({
    opacity: animationProgress.value * 0.3,
  }));

  return (
    <View
      style={[{ width: '100%', height }, style]}
      onLayout={handleLayout}
      accessibilityRole='image'
      accessibilityLabel={`Radar chart with ${data.length} axes, maximum value ${Math.round(maxVal)}`}
    >
      <Svg width={chartWidth} height={height}>
        {/* Grid circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, index) => (
          <Circle
            key={`grid-circle-${index}`}
            cx={centerX}
            cy={centerY}
            r={radius * ratio}
            stroke={mutedColor}
            strokeWidth={0.5}
            fill='none'
            opacity={0.3}
          />
        ))}

        {/* Grid lines */}
        {data.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const endX = centerX + radius * Math.cos(angle);
          const endY = centerY + radius * Math.sin(angle);

          return (
            <Line
              key={`grid-line-${index}`}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke={mutedColor}
              strokeWidth={0.5}
              opacity={0.3}
            />
          );
        })}

        {/* Radar area */}
        <AnimatedPath
          d={radarPath}
          fill={primaryColor}
          stroke={primaryColor}
          strokeWidth={2}
          animatedProps={radarAnimatedProps}
        />

        {/* Data points */}
        {points.map((point, index) => (
          <AnimatedVertex
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            fill={primaryColor}
            index={index}
            animationProgress={animationProgress}
          />
        ))}

        {/* Labels */}
        {showLabels &&
          points.map((point, index) => (
            <SvgText
              key={`label-${index}`}
              x={point.labelX}
              y={point.labelY}
              textAnchor='middle'
              fontSize={12}
              fill={mutedColor}
              alignmentBaseline='middle'
            >
              {point.label}
            </SvgText>
          ))}
      </Svg>
    </View>
  );
};
