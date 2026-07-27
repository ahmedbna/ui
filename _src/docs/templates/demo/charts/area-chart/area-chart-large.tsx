import { AreaChart } from '@/components/charts/area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 'Jan', y: 65000, label: 'January' },
  { x: 'Feb', y: 80000, label: 'February' },
  { x: 'Mar', y: 75000, label: 'March' },
  { x: 'Apr', y: 95000, label: 'April' },
  { x: 'May', y: 110000, label: 'May' },
  { x: 'Jun', y: 125000, label: 'June' },
  { x: 'Jul', y: 140000, label: 'July' },
  { x: 'Aug', y: 135000, label: 'August' },
  { x: 'Sep', y: 150000, label: 'September' },
  { x: 'Oct', y: 165000, label: 'October' },
  { x: 'Nov', y: 180000, label: 'November' },
  { x: 'Dec', y: 195000, label: 'December' },
];

export function AreaChartLarge() {
  return (
    <ChartContainer
      title='Annual Revenue Growth'
      description='Comprehensive yearly performance data'
    >
      <AreaChart
        data={sampleData}
        config={{
          height: 280,
          showGrid: true,
          showLabels: false,
          animated: true,
          duration: 2500,
          showYLabels: true,
          yLabelCount: 7,
          padding: 20,
        }}
      />
    </ChartContainer>
  );
}
