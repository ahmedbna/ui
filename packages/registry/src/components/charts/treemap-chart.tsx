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

type AnimatedTreemapRectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  animationProgress: SharedValue<number>;
};

// Per-item hook must live in its own mounted subcomponent, not in the
// parent's .map() body — calling useAnimatedProps per loop iteration
// violates Rules of Hooks the moment the rectangle count changes.
const AnimatedTreemapRect = React.memo(
  ({
    x,
    y,
    width,
    height,
    fill,
    stroke,
    animationProgress,
  }: AnimatedTreemapRectProps) => {
    const rectAnimatedProps = useAnimatedProps(() => ({
      width: animationProgress.value * width,
      height: animationProgress.value * height,
      opacity: animationProgress.value,
    }));

    return (
      <AnimatedRect
        x={x}
        y={y}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        rx={2}
        animatedProps={rectAnimatedProps}
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

export interface TreeMapDataPoint {
  label: string;
  value: number;
  color?: string;
  children?: TreeMapDataPoint[];
}

interface TreeMapRect {
  x: number;
  y: number;
  width: number;
  height: number;
  data: TreeMapDataPoint;
  depth: number;
}

type Props = {
  data: TreeMapDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

// Squarified treemap algorithm
const squarify = (
  data: TreeMapDataPoint[],
  x: number,
  y: number,
  width: number,
  height: number,
  depth: number = 0
): TreeMapRect[] => {
  if (data.length === 0) return [];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const normalizedData = data.map((item) => ({
    ...item,
    normalizedValue: (item.value / totalValue) * width * height,
  }));

  const rects: TreeMapRect[] = [];
  let remainingData = [...normalizedData];
  let currentX = x;
  let currentY = y;
  let remainingWidth = width;
  let remainingHeight = height;

  while (remainingData.length > 0) {
    const vertical = remainingWidth > remainingHeight;
    const dimension = vertical ? remainingHeight : remainingWidth;

    // Find the best row/column
    let bestRow: typeof remainingData = [];
    let bestRatio = Infinity;

    for (let i = 1; i <= remainingData.length; i++) {
      const row = remainingData.slice(0, i);
      const rowValue = row.reduce((sum, item) => sum + item.normalizedValue, 0);
      const rowDimension = rowValue / dimension;

      const worstRatio = Math.max(
        ...row.map((item) => {
          const itemDimension = item.normalizedValue / rowDimension;
          return Math.max(
            rowDimension / itemDimension,
            itemDimension / rowDimension
          );
        })
      );

      if (worstRatio < bestRatio) {
        bestRatio = worstRatio;
        bestRow = row;
      } else {
        break;
      }
    }

    // Place the row/column
    const rowValue = bestRow.reduce(
      (sum, item) => sum + item.normalizedValue,
      0
    );
    const rowDimension = rowValue / dimension;

    let offset = 0;
    bestRow.forEach((item) => {
      const itemDimension = item.normalizedValue / rowDimension;

      const rectX = vertical ? currentX : currentX + offset;
      const rectY = vertical ? currentY + offset : currentY;
      const rectWidth = vertical ? rowDimension : itemDimension;
      const rectHeight = vertical ? itemDimension : rowDimension;

      rects.push({
        x: rectX,
        y: rectY,
        width: rectWidth,
        height: rectHeight,
        data: item,
        depth,
      });

      offset += itemDimension;
    });

    // Update remaining space
    remainingData = remainingData.slice(bestRow.length);

    if (vertical) {
      currentX += rowDimension;
      remainingWidth -= rowDimension;
    } else {
      currentY += rowDimension;
      remainingHeight -= rowDimension;
    }
  }

  return rects;
};

export const TreeMapChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 10,
    showLabels = true,
    animated = true,
    duration = 800,
  } = config;

  // Use measured width or fallback to config width or default
  const chartWidth = containerWidth || config.width || 300;

  const backgroundColor = useColor('background');

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

  // Generate color palette
  const colors = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#06b6d4',
    '#f97316',
    '#84cc16',
    '#ec4899',
    '#6366f1',
  ];

  const getColor = (index: number, customColor?: string) => {
    if (customColor) return customColor;
    return colors[index % colors.length];
  };

  // Calculate rectangles
  const rectangles = squarify(
    data,
    padding,
    padding,
    chartWidth - padding * 2,
    height - padding * 2
  );

  return (
    <View style={[{ width: '100%', height }, style]} onLayout={handleLayout}>
      <Svg width={chartWidth} height={height}>
        {rectangles.map((rect, index) => {
          const color = getColor(index, rect.data.color);

          // Determine if text should be light or dark based on background
          const isLightBackground =
            color === '#f59e0b' || color === '#84cc16' || color === '#06b6d4';
          const textColor = isLightBackground ? '#000000' : '#ffffff';

          // Calculate font size based on rectangle size
          const fontSize = Math.min(rect.width / 8, rect.height / 4, 14);
          const showText = fontSize > 8 && showLabels;

          return (
            <G key={`rect-${index}`}>
              <AnimatedTreemapRect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill={color}
                stroke={backgroundColor}
                animationProgress={animationProgress}
              />

              {showText && (
                <G>
                  <SvgText
                    x={rect.x + rect.width / 2}
                    y={rect.y + rect.height / 2 - fontSize / 2}
                    textAnchor='middle'
                    fontSize={fontSize}
                    fontWeight='600'
                    fill={textColor}
                    opacity={animationProgress.value}
                  >
                    {rect.data.label}
                  </SvgText>

                  {rect.height > fontSize * 2.5 && (
                    <SvgText
                      x={rect.x + rect.width / 2}
                      y={rect.y + rect.height / 2 + fontSize / 2}
                      textAnchor='middle'
                      fontSize={fontSize * 0.8}
                      fill={textColor}
                      opacity={0.8}
                    >
                      {rect.data.value}
                    </SvgText>
                  )}
                </G>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
};
