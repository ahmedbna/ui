import { ChartContainer } from '@/components/charts/chart-container';
import { BarChart } from '@/components/charts/bar-chart';
import React from 'react';

const sampleData = [
  { label: 'Jan', value: 65, color: '#3b82f6' },
  { label: 'Feb', value: 78, color: '#ef4444' },
  { label: 'Mar', value: 52, color: '#10b981' },
  { label: 'Apr', value: 91, color: '#f59e0b' },
  { label: 'May', value: 73, color: '#8b5cf6' },
  { label: 'Jun', value: 85, color: '#06b6d4' },
];

export function BarChartDemo() {
  return (
    <ChartContainer
      title='Monthly Sales'
      description='Product sales performance by month'
    >
      <BarChart
        data={sampleData}
        config={{
          height: 220,
          showLabels: true,
          animated: true,
          duration: 1000,
        }}
      />
    </ChartContainer>
  );
}
