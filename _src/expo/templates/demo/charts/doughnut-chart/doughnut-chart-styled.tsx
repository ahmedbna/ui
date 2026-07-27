import { DoughnutChart } from '@/components/charts/doughnut-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const customData = [
  { label: 'Mobile', value: 65, color: '#FF6B6B' },
  { label: 'Desktop', value: 25, color: '#4ECDC4' },
  { label: 'Tablet', value: 8, color: '#45B7D1' },
  { label: 'Other', value: 2, color: '#96CEB4' },
];

export function DoughnutChartStyled() {
  return (
    <ChartContainer
      title='Device Usage'
      description='Traffic distribution by device type'
    >
      <DoughnutChart
        data={customData}
        config={{
          height: 280,
          showLabels: true,
          animated: true,
          duration: 800,
          innerRadius: 0.7,
        }}
        style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 12,
          padding: 16,
        }}
      />
    </ChartContainer>
  );
}
