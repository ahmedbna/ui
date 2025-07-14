import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Line, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
}

interface BubbleChartDataPoint {
  x: number;
  y: number;
  size: number;
  label?: string;
  color?: string;
}

type Props = {
  data: BubbleChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const BubbleChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 20,
    showGrid = true,
    showLabels = true,
    animated = true,
    duration = 800,
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

  const maxX = Math.max(...data.map((d) => d.x));
  const minX = Math.min(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  const minY = Math.min(...data.map((d) => d.y));
  const maxSize = Math.max(...data.map((d) => d.size));

  const xRange = maxX - minX || 1;
  const yRange = maxY - minY || 1;

  const innerChartWidth = chartWidth - padding * 2;
  const chartHeight = height - padding * 2;

  const colors = [
    primaryColor,
    useThemeColor({}, 'blue'),
    useThemeColor({}, 'green'),
    useThemeColor({}, 'orange'),
    useThemeColor({}, 'purple'),
    useThemeColor({}, 'pink'),
  ];

  // Convert data to screen coordinates
  const bubbles = data.map((point, index) => ({
    x: padding + ((point.x - minX) / xRange) * innerChartWidth,
    y: padding + ((maxY - point.y) / yRange) * chartHeight,
    radius: (point.size / maxSize) * 20 + 5, // Scale bubble size
    color: point.color || colors[index % colors.length],
    label: point.label,
  }));

  return (
    <View style={[{ width: '100%', height }, style]} onLayout={handleLayout}>
      <Svg width={chartWidth} height={height}>
        {/* Grid lines */}
        {showGrid && (
          <G>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <G key={`grid-${index}`}>
                <Line
                  x1={padding}
                  y1={padding + ratio * chartHeight}
                  x2={chartWidth - padding}
                  y2={padding + ratio * chartHeight}
                  stroke={mutedColor}
                  strokeWidth={0.5}
                  opacity={0.3}
                />
                <Line
                  x1={padding + ratio * innerChartWidth}
                  y1={padding}
                  x2={padding + ratio * innerChartWidth}
                  y2={height - padding}
                  stroke={mutedColor}
                  strokeWidth={0.5}
                  opacity={0.3}
                />
              </G>
            ))}
          </G>
        )}

        {/* Bubbles */}
        {bubbles.map((bubble, index) => {
          const bubbleAnimatedProps = useAnimatedProps(() => ({
            opacity: animationProgress.value * 0.7,
            r: withDelay(
              index * 100,
              withSpring(animationProgress.value * bubble.radius)
            ),
          }));

          return (
            <G key={`bubble-${index}`}>
              <AnimatedCircle
                cx={bubble.x}
                cy={bubble.y}
                fill={bubble.color}
                animatedProps={bubbleAnimatedProps}
              />
              {showLabels && bubble.label && (
                <SvgText
                  x={bubble.x}
                  y={bubble.y}
                  textAnchor='middle'
                  fontSize={10}
                  fill='#FFFFFF'
                  fontWeight='600'
                  alignmentBaseline='middle'
                >
                  {bubble.label}
                </SvgText>
              )}
            </G>
          );
        })}

        {/* Axis labels */}
        <G>
          {/* X-axis labels */}
          {[minX, (minX + maxX) / 2, maxX].map((value, index) => (
            <SvgText
              key={`x-label-${index}`}
              x={padding + (index * innerChartWidth) / 2}
              y={height - 5}
              textAnchor='middle'
              fontSize={12}
              fill={mutedColor}
            >
              {Math.round(value)}
            </SvgText>
          ))}
          {/* Y-axis labels */}
          {[maxY, (minY + maxY) / 2, minY].map((value, index) => (
            <SvgText
              key={`y-label-${index}`}
              x={15}
              y={padding + (index * chartHeight) / 2}
              textAnchor='middle'
              fontSize={12}
              fill={mutedColor}
              alignmentBaseline='middle'
            >
              {Math.round(value)}
            </SvgText>
          ))}
        </G>
      </Svg>
    </View>
  );
};
