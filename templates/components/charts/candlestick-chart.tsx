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
const AnimatedLine = Animated.createAnimatedComponent(Line);

interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
}

interface CandlestickDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

type Props = {
  data: CandlestickDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const CandlestickChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 20,
    showGrid = true,
    showLabels = true,
    animated = true,
    duration = 800,
  } = config;

  // Use measured width or fallback to config width or default
  const chartWidth = containerWidth || config.width || 300;

  const bullishColor = useThemeColor({}, 'green');
  const bearishColor = useThemeColor({}, 'red');
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

  const allValues = data.flatMap((d) => [d.open, d.high, d.low, d.close]);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const valueRange = maxValue - minValue || 1;

  const innerChartWidth = chartWidth - padding * 2;
  const chartHeight = height - padding * 2;
  const candleWidth = (innerChartWidth / data.length) * 0.6;
  const candleSpacing = (innerChartWidth / data.length) * 0.4;

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

        {data.map((item, index) => {
          const isBullish = item.close >= item.open;
          const color = isBullish ? bullishColor : bearishColor;

          const x =
            padding + index * (candleWidth + candleSpacing) + candleSpacing / 2;
          const highY =
            padding + ((maxValue - item.high) / valueRange) * chartHeight;
          const lowY =
            padding + ((maxValue - item.low) / valueRange) * chartHeight;
          const openY =
            padding + ((maxValue - item.open) / valueRange) * chartHeight;
          const closeY =
            padding + ((maxValue - item.close) / valueRange) * chartHeight;

          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY) || 1;

          const wickAnimatedProps = useAnimatedProps(() => ({
            y1: highY,
            y2: lowY,
            opacity: animationProgress.value,
          }));

          const bodyAnimatedProps = useAnimatedProps(() => ({
            height: animationProgress.value * bodyHeight,
            y: bodyTop,
            opacity: animationProgress.value,
          }));

          return (
            <G key={`candle-${index}`}>
              {/* High-Low wick */}
              <AnimatedLine
                x1={x + candleWidth / 2}
                x2={x + candleWidth / 2}
                stroke={color}
                strokeWidth={1}
                animatedProps={wickAnimatedProps}
              />

              {/* Open-Close body */}
              <AnimatedRect
                x={x}
                width={candleWidth}
                // fill={isBullish ? 'transparent' : color}
                fill={color}
                stroke={color}
                strokeWidth={1}
                animatedProps={bodyAnimatedProps}
              />

              {showLabels &&
                index % Math.max(1, Math.floor(data.length / 5)) === 0 && (
                  <SvgText
                    x={x + candleWidth / 2}
                    y={height - 5}
                    textAnchor='middle'
                    fontSize={10}
                    fill={mutedColor}
                  >
                    {item.date}
                  </SvgText>
                )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
};
