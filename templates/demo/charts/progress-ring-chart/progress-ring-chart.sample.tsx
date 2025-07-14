import { ProgressRingChart } from '@/components/charts/progress-ring-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

export function ProgressRingChartSample() {
  return (
    <ChartContainer
      title='Daily Steps'
      description='Track your daily step count'
    >
      <ProgressRingChart
        progress={68}
        size={140}
        strokeWidth={10}
        config={{
          animated: true,
          duration: 1500,
          gradient: false,
        }}
        showLabel={true}
        label='Daily Goal'
        centerText='6,800'
      />
    </ChartContainer>
  );
}
