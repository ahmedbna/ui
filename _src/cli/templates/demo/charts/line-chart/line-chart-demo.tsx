import { ChartContainer } from '@/components/charts/chart-container';
import { LineChart } from '@/components/charts/line-chart';
import React from 'react';

const sampleData = [
  { x: 1, y: 10, label: 'Jan' },
  { x: 2, y: 25, label: 'Feb' },
  { x: 3, y: 15, label: 'Mar' },
  { x: 4, y: 40, label: 'Apr' },
  { x: 5, y: 30, label: 'May' },
  { x: 6, y: 55, label: 'Jun' },
  { x: 7, y: 45, label: 'Jul' },
];

export function LineChartDemo() {
  return (
    <ChartContainer
      title='Revenue Trend'
      description='Monthly revenue growth over time'
    >
      <LineChart
        data={sampleData}
        config={{
          height: 220,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1500,
          interactive: true,
        }}
      />
    </ChartContainer>
  );
}
