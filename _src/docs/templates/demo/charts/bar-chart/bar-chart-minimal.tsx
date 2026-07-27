import { BarChart } from '@/components/charts/bar-chart';
import React from 'react';

const sampleData = [
  { label: 'A', value: 30 },
  { label: 'B', value: 50 },
  { label: 'C', value: 25 },
  { label: 'D', value: 70 },
  { label: 'E', value: 45 },
  { label: 'F', value: 60 },
];

export function BarChartMinimal() {
  return (
    <BarChart
      data={sampleData}
      config={{
        height: 150,
        showLabels: false,
        animated: true,
        duration: 600,
        padding: 10,
      }}
    />
  );
}
