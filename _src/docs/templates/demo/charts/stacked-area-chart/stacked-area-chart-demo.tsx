import { StackedAreaChart } from '@/components/charts/stacked-area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { x: 1, y: [20, 30, 25], label: 'Jan' },
  { x: 2, y: [25, 35, 30], label: 'Feb' },
  { x: 3, y: [30, 40, 35], label: 'Mar' },
  { x: 4, y: [35, 45, 40], label: 'Apr' },
  { x: 5, y: [40, 50, 45], label: 'May' },
  { x: 6, y: [45, 55, 50], label: 'Jun' },
];

const categories = ['Product A', 'Product B', 'Product C'];

export function StackedAreaChartDemo() {
  return (
    <ChartContainer
      title='Monthly Revenue by Product'
      description='Revenue breakdown showing contribution of each product line'
    >
      <StackedAreaChart
        data={sampleData}
        categories={categories}
        config={{
          height: 300,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 1000,
        }}
      />
    </ChartContainer>
  );
}
