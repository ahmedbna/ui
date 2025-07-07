// components/ui/charts/types.d.ts

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface LineChartDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface BubbleChartDataPoint {
  x: number;
  y: number;
  size: number;
  label?: string;
  color?: string;
}

export interface RadarChartDataPoint {
  label: string;
  value: number;
}

export interface HeatmapDataPoint {
  row: string | number;
  col: string | number;
  value: number;
  label?: string;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  padding?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
  gradient?: boolean;
  interactive?: boolean;
  innerRadius?: number; // For doughnut charts
  maxValue?: number; // For radar charts
  colorScale?: string[]; // For heatmap charts - array of hex colors for gradient
}
