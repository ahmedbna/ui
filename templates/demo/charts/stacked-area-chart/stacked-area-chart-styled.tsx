import { StackedAreaChart } from '@/components/charts/stacked-area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 1, y: [120, 80, 60], label: 'Week 1' },
  { x: 2, y: [140, 90, 70], label: 'Week 2' },
  { x: 3, y: [160, 100, 80], label: 'Week 3' },
  { x: 4, y: [180, 110, 90], label: 'Week 4' },
  { x: 5, y: [200, 120, 100], label: 'Week 5' },
  { x: 6, y: [220, 130, 110], label: 'Week 6' },
  { x: 7, y: [240, 140, 120], label: 'Week 7' },
  { x: 8, y: [260, 150, 130], label: 'Week 8' },
];

const categories = ['Premium', 'Standard', 'Basic'];

export function StackedAreaChartStyled() {
  return (
    <ChartContainer
      title='Subscription Tiers Growth'
      description='Weekly growth in subscription tiers with custom styling'
    >
      <StackedAreaChart
        data={sampleData}
        categories={categories}
        colors={['#6366f1', '#8b5cf6', '#ec4899']}
        config={{
          height: 320,
          padding: 30,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 1500,
        }}
        style={{
          backgroundColor: '#f8fafc',
          borderRadius: 12,
          padding: 16,
        }}
      />
    </ChartContainer>
  );
}
