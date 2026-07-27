import { PieChart } from '@/components/charts/pie-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Mobile', value: 45 },
  { label: 'Desktop', value: 35 },
  { label: 'Tablet', value: 15 },
  { label: 'Other', value: 5 },
];

export function PieChartSample() {
  return (
    <ChartContainer
      title='Traffic Sources'
      description='Website traffic distribution by device type'
    >
      <PieChart
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
