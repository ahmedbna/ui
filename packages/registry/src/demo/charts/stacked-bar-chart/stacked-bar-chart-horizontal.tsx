import { StackedBarChart } from '@/components/charts/stacked-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Product A', values: [45, 30, 25] },
  { label: 'Product B', values: [60, 40, 35] },
  { label: 'Product C', values: [55, 35, 30] },
  { label: 'Product D', values: [70, 45, 40] },
  { label: 'Product E', values: [50, 32, 28] },
];

const categories = ['Direct Sales', 'Online', 'Retail'];

export function StackedBarChartHorizontal() {
  return (
    <ChartContainer
      title='Product Sales by Channel'
      description='Sales distribution across different channels'
    >
      <StackedBarChart
        data={sampleData}
        categories={categories}
        horizontal={true}
        config={{
          height: 350,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 1200,
        }}
      />
    </ChartContainer>
  );
}
