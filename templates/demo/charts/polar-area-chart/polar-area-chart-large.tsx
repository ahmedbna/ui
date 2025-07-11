import { PolarAreaChart } from '@/components/charts/polar-area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const largeDataset = [
  { label: 'Q1 Sales', value: 185 },
  { label: 'Q2 Sales', value: 220 },
  { label: 'Q3 Sales', value: 195 },
  { label: 'Q4 Sales', value: 240 },
  { label: 'Marketing', value: 156 },
  { label: 'Support', value: 134 },
  { label: 'Development', value: 189 },
  { label: 'Design', value: 123 },
  { label: 'HR', value: 98 },
  { label: 'Finance', value: 145 },
  { label: 'Operations', value: 167 },
  { label: 'Research', value: 112 },
];

export function PolarAreaChartLarge() {
  return (
    <ChartContainer
      title='Annual Performance Overview'
      description='Comprehensive performance metrics across all departments and quarters'
    >
      <PolarAreaChart
        data={largeDataset}
        config={{
          height: 400,
          showLabels: true,
          animated: true,
          duration: 2000,
        }}
      />
    </ChartContainer>
  );
}
