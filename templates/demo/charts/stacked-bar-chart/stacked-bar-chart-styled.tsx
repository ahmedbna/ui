import { StackedBarChart } from '@/components/charts/stacked-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Mobile', values: [85, 45, 30, 20] },
  { label: 'Desktop', values: [120, 80, 50, 35] },
  { label: 'Tablet', values: [65, 35, 25, 15] },
  { label: 'Smart TV', values: [40, 20, 15, 10] },
];

const categories = ['Chrome', 'Safari', 'Firefox', 'Edge'];

// Custom colors for different browsers
const customColors = [
  '#4285F4', // Chrome blue
  '#FF9500', // Safari orange
  '#FF6611', // Firefox orange
  '#0078D4', // Edge blue
];

export function StackedBarChartStyled() {
  return (
    <ChartContainer
      title='Browser Usage by Device'
      description='Browser market share across different device types'
    >
      <StackedBarChart
        data={sampleData}
        categories={categories}
        colors={customColors}
        config={{
          height: 320,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 1500,
          padding: 30,
        }}
      />
    </ChartContainer>
  );
}
