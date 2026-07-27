import { StackedBarChart } from '@/components/charts/stacked-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Jan', values: [220, 180, 140, 100, 80] },
  { label: 'Feb', values: [240, 190, 150, 110, 85] },
  { label: 'Mar', values: [260, 200, 160, 120, 90] },
  { label: 'Apr', values: [280, 210, 170, 130, 95] },
  { label: 'May', values: [300, 220, 180, 140, 100] },
  { label: 'Jun', values: [320, 230, 190, 150, 105] },
  { label: 'Jul', values: [340, 240, 200, 160, 110] },
  { label: 'Aug', values: [360, 250, 210, 170, 115] },
  { label: 'Sep', values: [380, 260, 220, 180, 120] },
  { label: 'Oct', values: [400, 270, 230, 190, 125] },
  { label: 'Nov', values: [420, 280, 240, 200, 130] },
  { label: 'Dec', values: [440, 290, 250, 210, 135] },
];

const categories = ['Enterprise', 'Professional', 'Standard', 'Basic', 'Free'];

export function StackedBarChartLarge() {
  return (
    <ChartContainer
      title='Annual Subscription Revenue'
      description='Monthly recurring revenue breakdown by subscription tier'
    >
      <StackedBarChart
        data={sampleData}
        categories={categories}
        config={{
          height: 400,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 2000,
          padding: 25,
        }}
      />
    </ChartContainer>
  );
}
