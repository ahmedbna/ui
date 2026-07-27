import { ScatterPlot } from '@/components/charts/scatter-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 10, y: 20, label: 'Point A' },
  { x: 25, y: 35, label: 'Point B' },
  { x: 40, y: 15, label: 'Point C' },
  { x: 55, y: 45, label: 'Point D' },
  { x: 70, y: 30, label: 'Point E' },
  { x: 85, y: 55, label: 'Point F' },
  { x: 30, y: 50, label: 'Point G' },
  { x: 65, y: 25, label: 'Point H' },
];

export function ScatterChartDemo() {
  return (
    <ChartContainer
      title='Performance vs Experience'
      description='Scatter plot showing the relationship between years of experience and performance scores'
    >
      <ScatterPlot
        data={sampleData}
        config={{
          height: 300,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1000,
        }}
      />
    </ChartContainer>
  );
}
