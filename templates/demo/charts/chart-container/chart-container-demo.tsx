import { ChartContainer } from '@/components/charts/chart-container';
import { LineChart } from '@/components/charts/line-chart';
import React from 'react';

const sampleData = [
  { x: 'Jan', y: 100, label: 'January' },
  { x: 'Feb', y: 120, label: 'February' },
  { x: 'Mar', y: 90, label: 'March' },
  { x: 'Apr', y: 140, label: 'April' },
  { x: 'May', y: 110, label: 'May' },
];

export function ChartContainerDemo() {
  return (
    <ChartContainer
      title='Monthly Revenue'
      description='Revenue data for the last 6 months'
    >
      <LineChart
        data={sampleData}
        config={{
          height: 200,
          animated: true,
          showGrid: true,
          showLabels: true,
        }}
      />
    </ChartContainer>
  );
}
