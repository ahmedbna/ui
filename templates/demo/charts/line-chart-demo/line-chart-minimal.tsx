import { LineChart } from '@/components/charts/line-chart';
import React from 'react';

const sampleData = [
  { x: 1, y: 20 },
  { x: 2, y: 45 },
  { x: 3, y: 28 },
  { x: 4, y: 67 },
  { x: 5, y: 89 },
  { x: 6, y: 34 },
];

export function LineChartMinimal() {
  return (
    <LineChart
      data={sampleData}
      config={{
        height: 160,
        showGrid: false,
        showLabels: false,
        animated: true,
        duration: 800,
        showYLabels: false,
        padding: 16,
      }}
    />
  );
}
