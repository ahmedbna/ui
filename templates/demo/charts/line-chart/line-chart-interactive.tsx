import { ChartContainer } from '@/components/charts/chart-container';
import { LineChart } from '@/components/charts/line-chart';
import React from 'react';

const sampleData = [
  { x: 'Q1', y: 45, label: 'Q1 2024' },
  { x: 'Q2', y: 67, label: 'Q2 2024' },
  { x: 'Q3', y: 52, label: 'Q3 2024' },
  { x: 'Q4', y: 89, label: 'Q4 2024' },
  { x: 'Q1', y: 95, label: 'Q1 2025' },
  { x: 'Q2', y: 110, label: 'Q2 2025' },
];

export function LineChartInteractive() {
  return (
    <ChartContainer
      title='Interactive Revenue Chart'
      description='Touch and drag to explore data points'
    >
      <LineChart
        data={sampleData}
        config={{
          height: 240,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1200,
          interactive: true,
          showYLabels: true,
          yLabelCount: 6,
        }}
      />
    </ChartContainer>
  );
}
