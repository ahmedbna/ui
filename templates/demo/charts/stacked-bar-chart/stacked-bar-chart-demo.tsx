import { StackedBarChart } from '@/components/charts/stacked-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Q1', values: [120, 98, 86] },
  { label: 'Q2', values: [140, 110, 95] },
  { label: 'Q3', values: [160, 130, 105] },
  { label: 'Q4', values: [180, 150, 115] },
];

const categories = ['Sales', 'Marketing', 'Support'];

export function StackedBarChartDemo() {
  return (
    <ChartContainer
      title='Quarterly Performance'
      description='Revenue breakdown by department across quarters'
    >
      <StackedBarChart
        data={sampleData}
        categories={categories}
        config={{
          height: 300,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 1000,
        }}
      />
    </ChartContainer>
  );
}
