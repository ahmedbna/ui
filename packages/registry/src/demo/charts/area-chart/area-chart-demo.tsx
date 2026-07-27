import { AreaChart } from '@/components/charts/area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 'Jan', y: 100, label: 'January' },
  { x: 'Feb', y: 120, label: 'February' },
  { x: 'Mar', y: 90, label: 'March' },
  { x: 'Apr', y: 140, label: 'April' },
  { x: 'May', y: 110, label: 'May' },
  { x: 'Jun', y: 130, label: 'June' },
];

export function AreaChartDemo() {
  return (
    <ChartContainer
      title='Website Traffic'
      description='Daily visitors with gradient fill'
    >
      <AreaChart
        data={sampleData}
        config={{
          height: 200,
          showGrid: true,
          showLabels: false,
          animated: true,
          duration: 1800,
          gradient: true,
        }}
      />
    </ChartContainer>
  );
}
