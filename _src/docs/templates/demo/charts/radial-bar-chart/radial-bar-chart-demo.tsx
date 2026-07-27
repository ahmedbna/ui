import { RadialBarChart } from '@/components/charts/radial-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Sales', value: 120 },
  { label: 'Marketing', value: 98 },
  { label: 'Support', value: 86 },
  { label: 'Development', value: 140 },
  { label: 'Design', value: 75 },
];

export function RadialBarChartDemo() {
  return (
    <ChartContainer
      title='Department Performance'
      description='Quarterly performance metrics by department'
    >
      <RadialBarChart
        data={sampleData}
        config={{
          animated: true,
          duration: 1000,
          gradient: false,
        }}
      />
    </ChartContainer>
  );
}
