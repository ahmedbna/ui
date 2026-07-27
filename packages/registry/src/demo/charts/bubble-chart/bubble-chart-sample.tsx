import { ChartContainer } from '@/components/charts/chart-container';
import { BubbleChart } from '@/components/charts/bubble-chart';
import React from 'react';

const sampleData = [
  { x: 20, y: 30, size: 45, label: 'Sales', color: '#FF6B6B' },
  { x: 35, y: 25, size: 35, label: 'Marketing', color: '#4ECDC4' },
  { x: 50, y: 40, size: 25, label: 'Dev', color: '#45B7D1' },
  { x: 65, y: 35, size: 30, label: 'Support', color: '#96CEB4' },
  { x: 40, y: 50, size: 20, label: 'HR', color: '#FFEAA7' },
  { x: 25, y: 45, size: 15, label: 'Finance', color: '#DDA0DD' },
];

export function BubbleChartSample() {
  return (
    <ChartContainer
      title='Department Analytics'
      description='Bubble chart showing department metrics'
    >
      <BubbleChart
        data={sampleData}
        config={{
          height: 320,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1500,
        }}
      />
    </ChartContainer>
  );
}
