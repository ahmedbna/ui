import { useColor } from '@/hooks/useColor';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
  gradient?: boolean;
  interactive?: boolean;
  showYLabels?: boolean;
  yLabelCount?: number;
  yAxisWidth?: number;
}

export type ChartDataPoint = {
  x: string | number;
  y: number;
  label?: string;
};

// Utility functions
const createPath = (points: { x: number; y: number }[]): string => {
  if (points.length === 0) return '';

  let path = `M${points[0].x},${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prevPoint = points[i - 1];
    const currentPoint = points[i];

    // Create smooth curves using quadratic bezier
    const cpx = (prevPoint.x + currentPoint.x) / 2;
    const cpy = prevPoint.y;

    path += ` Q${cpx},${cpy} ${currentPoint.x},${currentPoint.y}`;
  }

  return path;
};

const createAreaPath = (
  points: { x: number; y: number }[],
  height: number
): string => {
  if (points.length === 0) return '';

  let path = createPath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];

  path += ` L${lastPoint.x},${height} L${firstPoint.x},${height} Z`;

  return path;
};

// Helper function to format numbers for display
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
};

// Animated SVG Components
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedPointProps = {
  x: number;
  y: number;
  color: string;
  index: number;
  animationProgress: SharedValue<number>;
};

// Per-item hook must live in its own mounted subcomponent, not in the
// parent's .map() body — calling useAnimatedProps/useAnimatedStyle per
// loop iteration violates Rules of Hooks the moment data.length changes.
const AnimatedPoint = React.memo(
  ({ x, y, color, index, animationProgress }: AnimatedPointProps) => {
    // Animate the radius (not a style `scale` transform, which would pivot
    // around the SVG origin rather than the circle's own center) for a
    // staggered spring pop-in per point.
    const pointAnimatedProps = useAnimatedProps(() => ({
      opacity: animationProgress.value,
      r: withDelay(index * 50, withSpring(animationProgress.value * 4)),
    }));

    return (
      <AnimatedCircle
        cx={x}
        cy={y}
        fill={color}
        animatedProps={pointAnimatedProps}
      />
    );
  }
);

type Props = {
  data: ChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const LineChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 20,
    showGrid = true,
    showLabels = true,
    animated = true,
    duration = 1000,
    gradient = false,
    interactive = false,
    showYLabels = true,
    yLabelCount = 5,
    yAxisWidth = 20,
  } = config;

  // Use measured width or fallback to config width or default
  const chartWidth = containerWidth || config.width || 300;

  const primaryColor = useColor('primary');
  const mutedColor = useColor('mutedForeground');

  const animationProgress = useSharedValue(0);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

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

  const maxValue = Math.max(...data.map((d) => d.y));
  const minValue = Math.min(...data.map((d) => d.y));
  const valueRange = maxValue - minValue || 1;

  // Adjust padding to account for y-axis labels
  const leftPadding = showYLabels ? padding + yAxisWidth : padding;
  const innerChartWidth = chartWidth - leftPadding - padding;
  const chartHeight = height - padding * 2;

  // Convert data to screen coordinates. A single-point dataset would divide
  // by zero (data.length - 1 === 0) — center it instead of producing NaN.
  const points = data.map((point, index) => ({
    x:
      leftPadding +
      (data.length > 1 ? index / (data.length - 1) : 0.5) * innerChartWidth,
    y: padding + ((maxValue - point.y) / valueRange) * chartHeight,
  }));

  const pathData = createPath(points);
  const areaPathData = gradient ? createAreaPath(points, height - padding) : '';

  // Generate y-axis labels
  const yAxisLabels = [];
  if (showYLabels) {
    for (let i = 0; i < yLabelCount; i++) {
      const ratio = i / (yLabelCount - 1);
      const value = maxValue - ratio * valueRange;
      const y = padding + ratio * chartHeight;
      yAxisLabels.push({ value, y });
    }
  }

  // Fixed animated props for SVG components
  const areaAnimatedProps = useAnimatedProps(() => ({
    strokeDasharray: animated
      ? `${animationProgress.value * 1000} 1000`
      : undefined,
  }));

  const lineAnimatedProps = useAnimatedProps(() => ({
    strokeDasharray: animated
      ? `${animationProgress.value * 1000} 1000`
      : undefined,
  }));

  const findNearestPointIndex = (x: number): number => {
    let nearest = 0;
    let minDistance = Math.abs(points[0].x - x);
    for (let i = 1; i < points.length; i++) {
      const distance = Math.abs(points[i].x - x);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = i;
      }
    }
    return nearest;
  };

  // Pan gesture using new Gesture API. Disabled (not just no-op'd) when
  // !interactive so it doesn't compete with a parent ScrollView's own pan
  // recognizer for charts that never use it.
  const panGesture = Gesture.Pan()
    .enabled(interactive)
    .onStart((event) => {
      runOnJS(setActivePointIndex)(findNearestPointIndex(event.x));
    })
    .onUpdate((event) => {
      runOnJS(setActivePointIndex)(findNearestPointIndex(event.x));
    })
    .onEnd(() => {
      runOnJS(setActivePointIndex)(null);
    });

  const chartAccessibilityLabel = `Line chart with ${data.length} data points, ranging from ${formatNumber(minValue)} to ${formatNumber(maxValue)}`;

  return (
    <View
      style={[{ width: '100%', height }, style]}
      onLayout={handleLayout}
      accessibilityRole='image'
      accessibilityLabel={chartAccessibilityLabel}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View>
          <Svg width={chartWidth} height={height}>
            <Defs>
              {gradient && (
                <LinearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                  <Stop
                    offset='0%'
                    stopColor={primaryColor}
                    stopOpacity='0.3'
                  />
                  <Stop
                    offset='100%'
                    stopColor={primaryColor}
                    stopOpacity='0.05'
                  />
                </LinearGradient>
              )}
            </Defs>

            {/* Y-axis labels */}
            {showYLabels && (
              <G>
                {yAxisLabels.map((label, index) => (
                  <SvgText
                    key={`y-label-${index}`}
                    x={leftPadding - 10}
                    y={label.y + 4}
                    textAnchor='end'
                    fontSize={10}
                    fill={mutedColor}
                  >
                    {formatNumber(label.value)}
                  </SvgText>
                ))}
              </G>
            )}

            {/* Grid lines */}
            {showGrid && (
              <G>
                {/* Horizontal grid lines */}
                {yAxisLabels.map((label, index) => (
                  <Line
                    key={`grid-h-${index}`}
                    x1={leftPadding}
                    y1={label.y}
                    x2={chartWidth - padding}
                    y2={label.y}
                    stroke={mutedColor}
                    strokeWidth={0.5}
                    opacity={0.3}
                  />
                ))}

                {/* Vertical grid lines */}
                {points.map((point, index) => (
                  <Line
                    key={`grid-v-${index}`}
                    x1={point.x}
                    y1={padding}
                    x2={point.x}
                    y2={height - padding}
                    stroke={mutedColor}
                    strokeWidth={0.5}
                    opacity={0.2}
                  />
                ))}
              </G>
            )}

            {/* Area fill */}
            {gradient && (
              <AnimatedPath
                d={areaPathData}
                fill='url(#gradient)'
                animatedProps={areaAnimatedProps}
              />
            )}

            {/* Line path */}
            <AnimatedPath
              d={pathData}
              stroke={primaryColor}
              strokeWidth={2}
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              animatedProps={lineAnimatedProps}
            />

            {/* Data points */}
            {points.map((point, index) => (
              <AnimatedPoint
                key={`point-${index}`}
                x={point.x}
                y={point.y}
                color={primaryColor}
                index={index}
                animationProgress={animationProgress}
              />
            ))}

            {/* X-axis labels */}
            {showLabels && (
              <G>
                {data.map((point, index) => (
                  <SvgText
                    key={`x-label-${index}`}
                    x={points[index].x}
                    y={height - 5}
                    textAnchor='middle'
                    fontSize={10}
                    fill={mutedColor}
                  >
                    {point.label || point.x.toString()}
                  </SvgText>
                ))}
              </G>
            )}

            {/* Interactive tooltip */}
            {interactive && activePointIndex !== null && (
              <G>
                <Line
                  x1={points[activePointIndex].x}
                  y1={padding}
                  x2={points[activePointIndex].x}
                  y2={height - padding}
                  stroke={mutedColor}
                  strokeWidth={1}
                  strokeDasharray='4 4'
                  opacity={0.5}
                />
                <Circle
                  cx={points[activePointIndex].x}
                  cy={points[activePointIndex].y}
                  r={6}
                  fill={primaryColor}
                  stroke='white'
                  strokeWidth={2}
                />
                <SvgText
                  x={points[activePointIndex].x}
                  y={Math.max(12, points[activePointIndex].y - 12)}
                  textAnchor='middle'
                  fontSize={11}
                  fontWeight='700'
                  fill={mutedColor}
                >
                  {formatNumber(data[activePointIndex].y)}
                </SvgText>
              </G>
            )}
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
