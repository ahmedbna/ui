import { ChartContainer } from '@/components/charts/chart-container';
import { BarChart } from '@/components/charts/bar-chart';
import React from 'react';

const sampleData = [
  { label: 'Q1', value: 45, color: '#3b82f6' },
  { label: 'Q2', value: 67, color: '#ef4444' },
  { label: 'Q3', value: 89, color: '#10b981' },
  { label: 'Q4', value: 123, color: '#f59e0b' },
];

export function BarChartStacked() {
  return (
    <ChartContainer
      title='Quarterly Revenue'
      description='Revenue growth by quarter'
    >
      <BarChart
        data={sampleData}
        config={{
          height: 200,
          showLabels: true,
          animated: true,
          duration: 1500,
        }}
      />
    </ChartContainer>
  );
}
