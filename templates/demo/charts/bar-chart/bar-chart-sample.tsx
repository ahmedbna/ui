import { ChartContainer } from '@/components/charts/chart-container';
import { BarChart } from '@/components/charts/bar-chart';
import React from 'react';

const sampleData = [
  { label: 'Product A', value: 120, color: '#3b82f6' },
  { label: 'Product B', value: 98, color: '#ef4444' },
  { label: 'Product C', value: 86, color: '#10b981' },
  { label: 'Product D', value: 74, color: '#f59e0b' },
  { label: 'Product E', value: 65, color: '#8b5cf6' },
];

export function BarChartSample() {
  return (
    <ChartContainer
      title='Product Performance'
      description='Sales performance by product category'
    >
      <BarChart
        data={sampleData}
        config={{
          height: 250,
          showLabels: true,
          animated: true,
          duration: 1200,
        }}
      />
    </ChartContainer>
  );
}
