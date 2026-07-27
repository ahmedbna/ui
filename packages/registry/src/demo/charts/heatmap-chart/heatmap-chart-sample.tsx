import { HeatmapChart } from '@/components/charts/heatmap-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { row: 'Q1', col: 'Sales', value: 85 },
  { row: 'Q1', col: 'Marketing', value: 72 },
  { row: 'Q1', col: 'Support', value: 90 },
  { row: 'Q1', col: 'Development', value: 78 },
  { row: 'Q2', col: 'Sales', value: 92 },
  { row: 'Q2', col: 'Marketing', value: 65 },
  { row: 'Q2', col: 'Support', value: 88 },
  { row: 'Q2', col: 'Development', value: 95 },
  { row: 'Q3', col: 'Sales', value: 78 },
  { row: 'Q3', col: 'Marketing', value: 83 },
  { row: 'Q3', col: 'Support', value: 91 },
  { row: 'Q3', col: 'Development', value: 87 },
  { row: 'Q4', col: 'Sales', value: 96 },
  { row: 'Q4', col: 'Marketing', value: 89 },
  { row: 'Q4', col: 'Support', value: 94 },
  { row: 'Q4', col: 'Development', value: 92 },
];

export function HeatmapChartSample() {
  return (
    <ChartContainer
      title='Quarterly Performance Matrix'
      description='Performance scores by department and quarter'
    >
      <HeatmapChart
        data={sampleData}
        config={{
          height: 280,
          showLabels: true,
          animated: true,
          duration: 800,
          colorScale: ['#fef3c7', '#f59e0b', '#d97706'],
        }}
      />
    </ChartContainer>
  );
}
