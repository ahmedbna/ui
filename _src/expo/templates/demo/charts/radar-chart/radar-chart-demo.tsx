import { RadarChart } from '@/components/charts/radar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Speed', value: 80 },
  { label: 'Reliability', value: 92 },
  { label: 'Comfort', value: 75 },
  { label: 'Safety', value: 88 },
  { label: 'Efficiency', value: 85 },
  { label: 'Style', value: 70 },
];

export function RadarChartDemo() {
  return (
    <ChartContainer
      title='Product Performance'
      description='Multi-dimensional performance analysis across key metrics'
    >
      <RadarChart
        data={sampleData}
        config={{
          height: 300,
          showLabels: true,
          animated: true,
          duration: 1000,
        }}
      />
    </ChartContainer>
  );
}
