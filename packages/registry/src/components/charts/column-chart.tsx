import { useColor } from '@/hooks/useColor';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedRect = Animated.createAnimatedComponent(Rect);

type AnimatedColumnProps = {
  x: number;
  y: number;
  barHeight: number;
  barWidth: number;
  fill: string;
  animationProgress: SharedValue<number>;
};

// Per-item hook must live in its own mounted subcomponent, not in the
// parent's .map() body — calling useAnimatedProps per loop iteration
// violates Rules of Hooks the moment data.length changes.
const AnimatedColumn = React.memo(
  ({
    x,
    y,
    barHeight,
    barWidth,
    fill,
    animationProgress,
  }: AnimatedColumnProps) => {
    const barAnimatedProps = useAnimatedProps(() => ({
      width: animationProgress.value * barWidth,
    }));

    return (
      <AnimatedRect
        x={x}
        y={y}
        height={barHeight}
        fill={fill}
        rx={4}
        animatedProps={barAnimatedProps}
      />
    );
  }
);

interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
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

export const ColumnChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 20,
    showLabels = true,
    animated = true,
    duration = 800,
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

  const maxValue = Math.max(...data.map((d) => d.value));
  if (maxValue === 0) return null;

  const innerChartWidth = chartWidth - padding * 2;
  const chartHeight = height - padding * 2;
  const barHeight = (chartHeight / data.length) * 0.8;
  const barSpacing = (chartHeight / data.length) * 0.2;

  return (
    <View
      style={[{ width: '100%', height }, style]}
      onLayout={handleLayout}
      accessibilityRole='image'
      accessibilityLabel={`Column chart with ${data.length} bars, maximum value ${Math.round(maxValue)}`}
    >
      <Svg width={chartWidth} height={height}>
        {data.map((item, index) => {
          const barWidth = (item.value / maxValue) * innerChartWidth;
          const x = padding;
          const y = padding + index * (barHeight + barSpacing) + barSpacing / 2;

          return (
            <G key={`bar-${index}`}>
              <AnimatedColumn
                x={x}
                y={y}
                barHeight={barHeight}
                barWidth={barWidth}
                fill={item.color || primaryColor}
                animationProgress={animationProgress}
              />

              {showLabels && (
                <>
                  <SvgText
                    x={padding - 10}
                    y={y + barHeight / 2}
                    textAnchor='end'
                    fontSize={12}
                    fill={mutedColor}
                    alignmentBaseline='middle'
                  >
                    {item.label}
                  </SvgText>
                  <SvgText
                    x={x + barWidth + 10}
                    y={y + barHeight / 2}
                    textAnchor='start'
                    fontSize={11}
                    fill={mutedColor}
                    fontWeight='600'
                    alignmentBaseline='middle'
                  >
                    {item.value}
                  </SvgText>
                </>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
};
