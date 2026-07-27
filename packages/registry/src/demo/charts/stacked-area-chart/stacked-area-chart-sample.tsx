import { StackedAreaChart } from '@/components/charts/stacked-area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 1, y: [45, 55, 35, 25], label: 'Q1' },
  { x: 2, y: [50, 60, 40, 30], label: 'Q2' },
  { x: 3, y: [55, 65, 45, 35], label: 'Q3' },
  { x: 4, y: [60, 70, 50, 40], label: 'Q4' },
  { x: 5, y: [65, 75, 55, 45], label: 'Q1' },
  { x: 6, y: [70, 80, 60, 50], label: 'Q2' },
];

const categories = ['Direct Sales', 'Online', 'Retail', 'Partner'];

export function StackedAreaChartSample() {
  return (
    <ChartContainer
      title='Sales Channel Performance'
      description='Quarterly performance across different sales channels'
    >
      <StackedAreaChart
        data={sampleData}
        categories={categories}
        colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7300']}
        config={{
          height: 280,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 1200,
        }}
      />
    </ChartContainer>
  );
}
