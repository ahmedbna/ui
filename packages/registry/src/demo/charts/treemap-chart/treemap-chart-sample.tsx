import { TreeMapChart } from '@/components/charts/treemap-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Product A', value: 250 },
  { label: 'Product B', value: 180 },
  { label: 'Product C', value: 320 },
  { label: 'Product D', value: 90 },
  { label: 'Product E', value: 150 },
  { label: 'Product F', value: 45 },
  { label: 'Product G', value: 210 },
  { label: 'Product H', value: 75 },
];

export function TreeMapChartSample() {
  return (
    <ChartContainer
      title='Product Sales Distribution'
      description='Revenue breakdown by product category'
    >
      <TreeMapChart
        data={sampleData}
        config={{
          height: 250,
          showLabels: true,
          animated: true,
          duration: 800,
        }}
      />
    </ChartContainer>
  );
}
