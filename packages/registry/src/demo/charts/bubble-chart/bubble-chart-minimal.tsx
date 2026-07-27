import { BubbleChart } from '@/components/charts/bubble-chart';
import React from 'react';

const minimalData = [
  { x: 20, y: 30, size: 25 },
  { x: 40, y: 45, size: 35 },
  { x: 60, y: 25, size: 20 },
  { x: 35, y: 55, size: 30 },
  { x: 70, y: 40, size: 15 },
];

export function BubbleChartMinimal() {
  return (
    <BubbleChart
      data={minimalData}
      config={{
        height: 200,
        showGrid: false,
        showLabels: false,
        animated: true,
        duration: 1000,
        padding: 10,
      }}
    />
  );
}
