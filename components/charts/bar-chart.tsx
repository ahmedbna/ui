import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';

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

export const BarChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 20,
    showLabels = true,
    animated = true,
    duration = 800,
  } = config;

  // Use measured width or fallback to config width or default
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

  const maxValue = Math.max(...data.map((d) => d.value));
  const innerChartWidth = chartWidth - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = (innerChartWidth / data.length) * 0.8;
  const barSpacing = (innerChartWidth / data.length) * 0.2;

  return (
    <View style={[{ width: '100%', height }, style]} onLayout={handleLayout}>
      <Svg width={chartWidth} height={height}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
          const y = height - padding - barHeight;

          const barAnimatedProps = useAnimatedProps(() => ({
            height: animationProgress.value * barHeight,
            y: height - padding - animationProgress.value * barHeight,
          }));

          return (
            <G key={`bar-${index}`}>
              <AnimatedRect
                x={x}
                width={barWidth}
                fill={item.color || primaryColor}
                rx={4}
                animatedProps={barAnimatedProps}
              />

              {showLabels && (
                <>
                  <SvgText
                    x={x + barWidth / 2}
                    y={height - 5}
                    textAnchor='middle'
                    fontSize={12}
                    fill={mutedColor}
                  >
                    {item.label}
                  </SvgText>
                  <SvgText
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor='middle'
                    fontSize={11}
                    fill={mutedColor}
                    fontWeight='600'
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
