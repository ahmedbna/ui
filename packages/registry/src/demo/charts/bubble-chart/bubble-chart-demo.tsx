import { ChartContainer } from '@/components/charts/chart-container';
import { BubbleChart } from '@/components/charts/bubble-chart';
import React from 'react';

const sampleData = [
  { x: 10, y: 20, size: 15, label: 'A' },
  { x: 25, y: 30, size: 25, label: 'B' },
  { x: 40, y: 15, size: 30, label: 'C' },
  { x: 35, y: 45, size: 20, label: 'D' },
  { x: 60, y: 25, size: 18, label: 'E' },
  { x: 50, y: 40, size: 22, label: 'F' },
  { x: 15, y: 35, size: 28, label: 'G' },
  { x: 70, y: 50, size: 16, label: 'H' },
];

export function BubbleChartDemo() {
  return (
    <ChartContainer
      title='Performance vs Efficiency'
      description='Team performance metrics with bubble sizes representing team size'
    >
      <BubbleChart
        data={sampleData}
        config={{
          height: 300,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1200,
        }}
      />
    </ChartContainer>
  );
}
