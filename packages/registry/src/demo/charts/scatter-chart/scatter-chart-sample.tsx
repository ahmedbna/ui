import { ScatterPlot } from '@/components/charts/scatter-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 5, y: 12, label: 'Alpha' },
  { x: 15, y: 28, label: 'Beta' },
  { x: 35, y: 42, label: 'Gamma' },
  { x: 45, y: 18, label: 'Delta' },
  { x: 25, y: 65, label: 'Epsilon' },
  { x: 55, y: 38, label: 'Zeta' },
  { x: 75, y: 52, label: 'Eta' },
  { x: 65, y: 78, label: 'Theta' },
  { x: 85, y: 25, label: 'Iota' },
  { x: 95, y: 88, label: 'Kappa' },
];

export function ScatterChartSample() {
  return (
    <ChartContainer
      title='Sample Data Distribution'
      description='Sample scatter plot with random data points'
    >
      <ScatterPlot
        data={sampleData}
        config={{
          height: 250,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 800,
        }}
      />
    </ChartContainer>
  );
}
