import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
}

export interface StackedBarDataPoint {
  label: string;
  values: number[];
}

type Props = {
  data: StackedBarDataPoint[];
  colors?: string[];
  config?: ChartConfig;
  style?: ViewStyle;
  categories?: string[];
  horizontal?: boolean;
};

export const StackedBarChart = ({
  data,
  colors = [],
  config = {},
  style,
  categories = [],
  horizontal = false,
}: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 20,
    showLabels = true,
    showGrid = true,
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

  const maxValue = Math.max(
    ...data.map((d) => d.values.reduce((sum, val) => sum + val, 0))
  );
  const seriesCount = data[0]?.values.length || 0;

  const innerChartWidth = chartWidth - padding * 2;
  const chartHeight = height - padding * 2;

  // Default colors if not provided
  const defaultColors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#00ff00',
    '#0088fe',
    primaryColor,
  ];

  const seriesColors =
    colors.length >= seriesCount
      ? colors
      : [...colors, ...defaultColors].slice(0, seriesCount);

  if (horizontal) {
    // Horizontal stacked bars
    const barHeight = (chartHeight / data.length) * 0.8;
    const barSpacing = (chartHeight / data.length) * 0.2;

    return (
      <View style={[{ width: '100%', height }, style]} onLayout={handleLayout}>
        <Svg width={chartWidth} height={height}>
          {/* Grid lines */}
          {showGrid && (
            <G>
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
                <Line
                  key={`grid-${index}`}
                  x1={padding + ratio * innerChartWidth}
                  y1={padding}
                  x2={padding + ratio * innerChartWidth}
                  y2={height - padding}
                  stroke={mutedColor}
                  strokeWidth={0.5}
                  opacity={0.3}
                />
              ))}
            </G>
          )}

          {data.map((item, itemIndex) => {
            let cumulativeWidth = 0;
            const y =
              padding + itemIndex * (barHeight + barSpacing) + barSpacing / 2;

            return (
              <G key={`bar-group-${itemIndex}`}>
                {item.values.map((value, valueIndex) => {
                  const segmentWidth = (value / maxValue) * innerChartWidth;
                  const x = padding + cumulativeWidth;

                  const segmentAnimatedProps = useAnimatedProps(() => ({
                    width: animationProgress.value * segmentWidth,
                  }));

                  cumulativeWidth += segmentWidth;

                  return (
                    <AnimatedRect
                      key={`segment-${itemIndex}-${valueIndex}`}
                      x={x}
                      y={y}
                      height={barHeight}
                      fill={seriesColors[valueIndex]}
                      rx={2}
                      animatedProps={segmentAnimatedProps}
                    />
                  );
                })}

                {/* Bar labels */}
                {showLabels && (
                  <SvgText
                    x={padding - 10}
                    y={y + barHeight / 2 + 4}
                    textAnchor='end'
                    fontSize={12}
                    fill={mutedColor}
                  >
                    {item.label}
                  </SvgText>
                )}
              </G>
            );
          })}

          {/* Legend */}
          {categories.length > 0 && (
            <G>
              {categories.map((category, index) => (
                <G key={`legend-${index}`}>
                  <Rect
                    x={padding + index * 80}
                    y={height - padding + 10}
                    width={12}
                    height={8}
                    fill={seriesColors[index]}
                    rx={2}
                  />
                  <SvgText
                    x={padding + index * 80 + 18}
                    y={height - padding + 18}
                    fontSize={11}
                    fill={mutedColor}
                  >
                    {category}
                  </SvgText>
                </G>
              ))}
            </G>
          )}
        </Svg>
      </View>
    );
  }

  // Vertical stacked bars
  const barWidth = (innerChartWidth / data.length) * 0.8;
  const barSpacing = (innerChartWidth / data.length) * 0.2;

  return (
    <View style={[{ width: '100%', height }, style]} onLayout={handleLayout}>
      <Svg width={chartWidth} height={height}>
        {/* Grid lines */}
        {showGrid && (
          <G>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <Line
                key={`grid-${index}`}
                x1={padding}
                y1={padding + ratio * chartHeight}
                x2={chartWidth - padding}
                y2={padding + ratio * chartHeight}
                stroke={mutedColor}
                strokeWidth={0.5}
                opacity={0.3}
              />
            ))}
          </G>
        )}

        {data.map((item, itemIndex) => {
          let cumulativeHeight = 0;
          const x =
            padding + itemIndex * (barWidth + barSpacing) + barSpacing / 2;
          const totalValue = item.values.reduce((sum, val) => sum + val, 0);

          return (
            <G key={`bar-group-${itemIndex}`}>
              {item.values.map((value, valueIndex) => {
                const segmentHeight = (value / maxValue) * chartHeight;
                const y = height - padding - cumulativeHeight - segmentHeight;

                const segmentAnimatedProps = useAnimatedProps(() => ({
                  height: animationProgress.value * segmentHeight,
                  y:
                    height -
                    padding -
                    cumulativeHeight -
                    animationProgress.value * segmentHeight,
                }));

                cumulativeHeight += segmentHeight;

                return (
                  <AnimatedRect
                    key={`segment-${itemIndex}-${valueIndex}`}
                    x={x}
                    width={barWidth}
                    fill={seriesColors[valueIndex]}
                    rx={2}
                    animatedProps={segmentAnimatedProps}
                  />
                );
              })}

              {/* Bar labels */}
              {showLabels && (
                <SvgText
                  x={x + barWidth / 2}
                  y={height - 5}
                  textAnchor='middle'
                  fontSize={12}
                  fill={mutedColor}
                >
                  {item.label}
                </SvgText>
              )}
            </G>
          );
        })}

        {/* Legend */}
        {categories.length > 0 && (
          <G>
            {categories.map((category, index) => (
              <G key={`legend-${index}`}>
                <Rect
                  x={padding + index * 80}
                  y={padding - 25}
                  width={12}
                  height={8}
                  fill={seriesColors[index]}
                  rx={2}
                />
                <SvgText
                  x={padding + index * 80 + 18}
                  y={padding - 17}
                  fontSize={11}
                  fill={mutedColor}
                >
                  {category}
                </SvgText>
              </G>
            ))}
          </G>
        )}
      </Svg>
    </View>
  );
};
