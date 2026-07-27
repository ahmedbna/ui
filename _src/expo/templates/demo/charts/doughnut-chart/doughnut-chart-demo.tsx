import { DoughnutChart } from '@/components/charts/doughnut-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { label: 'Sales', value: 120 },
  { label: 'Marketing', value: 98 },
  { label: 'Support', value: 86 },
  { label: 'Development', value: 140 },
  { label: 'Design', value: 75 },
  { label: 'HR', value: 65 },
];

export function DoughnutChartDemo() {
  return (
    <ChartContainer
      title='Department Performance'
      description='Quarterly performance metrics by department'
    >
      <DoughnutChart
        data={sampleData}
        config={{
          height: 300,
          showLabels: true,
          animated: true,
          duration: 1000,
          innerRadius: 0.6,
        }}
      />
    </ChartContainer>
  );
}
