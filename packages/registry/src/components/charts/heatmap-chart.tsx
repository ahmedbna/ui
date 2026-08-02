import { useColor } from '@/hooks/useColor';
import React, { useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedRect = Animated.createAnimatedComponent(Rect);

type AnimatedCellProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  delay: number;
  animationProgress: SharedValue<number>;
};

// Per-item hook must live in its own mounted subcomponent, not in the
// parent's nested rows×cols .map() body — calling useAnimatedProps per
// loop iteration violates Rules of Hooks the moment data changes, and this
// is the worst multiplier in the chart set (one mount per row×col cell).
const AnimatedCell = React.memo(
  ({
    x,
    y,
    width,
    height,
    fill,
    delay,
    animationProgress,
  }: AnimatedCellProps) => {
    const cellAnimatedProps = useAnimatedProps(() => ({
      opacity: withDelay(
        delay,
        withTiming(animationProgress.value, { duration: 300 })
      ),
    }));

    return (
      <AnimatedRect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={4}
        animatedProps={cellAnimatedProps}
      />
    );
  }
);

// Utility functions
const interpolateColor = (
  color1: string,
  color2: string,
  factor: number
): string => {
  // Simple color interpolation between two hex colors
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);

  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const getHeatmapColor = (
  value: number,
  minValue: number,
  maxValue: number,
  colorScale: string[]
): string => {
  if (maxValue === minValue) return colorScale[0];

  const normalizedValue = (value - minValue) / (maxValue - minValue);
  const segmentSize = 1 / (colorScale.length - 1);
  const segmentIndex = Math.floor(normalizedValue / segmentSize);
  const segmentProgress = (normalizedValue % segmentSize) / segmentSize;

  if (segmentIndex >= colorScale.length - 1) {
    return colorScale[colorScale.length - 1];
  }

  return interpolateColor(
    colorScale[segmentIndex],
    colorScale[segmentIndex + 1],
    segmentProgress
  );
};

interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
  colorScale?: string[];
}

interface HeatmapDataPoint {
  row: string | number;
  col: string | number;
  value: number;
  label?: string;
}

type Props = {
  data: HeatmapDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const HeatmapChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    padding = 20,
    showLabels = true,
    animated = true,
    duration = 1000,
    colorScale = ['#e0f2fe', '#0369a1', '#1e3a8a'], // Light blue to dark blue
  } = config;

  // Use measured width or fallback to config width or default
  const chartWidth = containerWidth || config.width || 300;

  const mutedColor = useColor('mutedForeground');
  const textColor = useColor('foreground');

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

  // The grid rebuild is O(rows×cols) — the worst-case multiplier in the
  // chart set — so it's memoized rather than recomputed on every render
  // regardless of whether the inputs changed.
  const layout = useMemo(() => {
    const uniqueRows = [...new Set(data.map((d) => d.row))].sort();
    const uniqueCols = [...new Set(data.map((d) => d.col))].sort();
    const numRows = uniqueRows.length;
    const numCols = uniqueCols.length;

    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const innerChartWidth = chartWidth - padding * 2;
    const chartHeight = height - padding * 2;

    const cellSpacing = 2;
    const cellWidth = (innerChartWidth - (numCols - 1) * cellSpacing) / numCols;
    const cellHeight = (chartHeight - (numRows - 1) * cellSpacing) / numRows;

    const dataMap = new Map<string, HeatmapDataPoint>();
    data.forEach((point) => {
      dataMap.set(`${point.row}-${point.col}`, point);
    });

    const cells = uniqueRows.flatMap((row, rowIndex) =>
      uniqueCols.map((col, colIndex) => {
        const point = dataMap.get(`${row}-${col}`);
        const value = point?.value || 0;
        return {
          key: `${row}-${col}`,
          row,
          col,
          value,
          hasPoint: !!point,
          x: padding + colIndex * (cellWidth + cellSpacing),
          y: padding + rowIndex * (cellHeight + cellSpacing),
          color: getHeatmapColor(value, minValue, maxValue, colorScale),
          delay: (rowIndex * numCols + colIndex) * 50,
        };
      })
    );

    return {
      uniqueRows,
      uniqueCols,
      numRows,
      numCols,
      minValue,
      maxValue,
      cellWidth,
      cellHeight,
      cellSpacing,
      cells,
    };
  }, [data, chartWidth, height, padding, colorScale]);

  if (!data.length) return null;

  const {
    uniqueRows,
    uniqueCols,
    numRows,
    numCols,
    minValue,
    maxValue,
    cellWidth,
    cellHeight,
    cellSpacing,
    cells,
  } = layout;

  return (
    <View
      style={[{ width: '100%', height }, style]}
      onLayout={handleLayout}
      accessibilityRole='image'
      accessibilityLabel={`Heatmap with ${numRows} rows and ${numCols} columns, values from ${Math.round(minValue)} to ${Math.round(maxValue)}`}
    >
      <Svg width={chartWidth} height={height}>
        {cells.map((cell) => (
          <G key={`cell-${cell.key}`}>
            <AnimatedCell
              x={cell.x}
              y={cell.y}
              width={cellWidth}
              height={cellHeight}
              fill={cell.color}
              delay={cell.delay}
              animationProgress={animationProgress}
            />

            {showLabels && cellWidth > 30 && cellHeight > 20 && (
              <SvgText
                x={cell.x + cellWidth / 2}
                y={cell.y + cellHeight / 2 + 4}
                textAnchor='middle'
                fontSize={Math.min(10, cellWidth / 4)}
                fill={
                  cell.value > (minValue + maxValue) / 2 ? '#ffffff' : textColor
                }
                fontWeight='500'
              >
                {cell.hasPoint ? cell.value.toString() : ''}
              </SvgText>
            )}
          </G>
        ))}

        {/* Row labels */}
        {showLabels && (
          <G>
            {uniqueRows.map((row, rowIndex) => (
              <SvgText
                key={`row-label-${row}`}
                x={padding - 8}
                y={
                  padding +
                  rowIndex * (cellHeight + cellSpacing) +
                  cellHeight / 2 +
                  4
                }
                textAnchor='end'
                fontSize={12}
                fill={mutedColor}
              >
                {row}
              </SvgText>
            ))}
          </G>
        )}

        {/* Column labels */}
        {showLabels && (
          <G>
            {uniqueCols.map((col, colIndex) => (
              <SvgText
                key={`col-label-${col}`}
                x={
                  padding + colIndex * (cellWidth + cellSpacing) + cellWidth / 2
                }
                y={height - 5}
                textAnchor='middle'
                fontSize={12}
                fill={mutedColor}
              >
                {col}
              </SvgText>
            ))}
          </G>
        )}
      </Svg>
    </View>
  );
};
