// components/ui/charts/area-chart.tsx

import { LineChart } from '@/components/charts/line-chart';
import { ChartConfig, LineChartDataPoint } from '@/components/charts/types';
import { ViewStyle } from 'react-native';

type Props = {
  data: LineChartDataPoint[];
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
