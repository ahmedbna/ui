import { LineChart } from '@/components/charts/line-chart';
import { ViewStyle } from 'react-native';

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

interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

type Props = {
  data: ChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};
export const AreaChart = ({ data, config = {}, style }: Props) => {
  return (
    <LineChart
      data={data}
      config={{ ...config, gradient: true }}
      style={style}
    />
  );
};
