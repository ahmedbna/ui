import { RadialBarChart } from '@/components/charts/radial-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const largeDataset = [
  { label: 'Product A', value: 156 },
  { label: 'Product B', value: 142 },
  { label: 'Product C', value: 98 },
  { label: 'Product D', value: 124 },
  { label: 'Product E', value: 89 },
  { label: 'Product F', value: 167 },
  { label: 'Product G', value: 78 },
  { label: 'Product H', value: 134 },
];

export function RadialBarChartLarge() {
  return (
    <ChartContainer
      title='Product Performance'
      description='Sales performance across all product lines'
    >
      <RadialBarChart
        data={largeDataset}
        config={{
          animated: true,
          duration: 2000,
          padding: 15,
        }}
      />
    </ChartContainer>
  );
}
