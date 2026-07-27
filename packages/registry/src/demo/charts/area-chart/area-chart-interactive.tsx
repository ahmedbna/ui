import { AreaChart } from '@/components/charts/area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 'Jan', y: 4000, label: 'January' },
  { x: 'Feb', y: 3000, label: 'February' },
  { x: 'Mar', y: 5000, label: 'March' },
  { x: 'Apr', y: 4500, label: 'April' },
  { x: 'May', y: 6000, label: 'May' },
  { x: 'Jun', y: 7200, label: 'June' },
  { x: 'Jul', y: 6800, label: 'July' },
];

export function AreaChartInteractive() {
  return (
    <ChartContainer
      title='Interactive User Engagement'
      description='Touch to explore monthly user activity'
    >
      <AreaChart
        data={sampleData}
        config={{
          height: 250,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1500,
          interactive: true,
          showYLabels: true,
          yLabelCount: 5,
        }}
      />
    </ChartContainer>
  );
}
