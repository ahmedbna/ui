import { ProgressRingChart } from '@/components/charts/progress-ring-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

export function ProgressRingChartDemo() {
  return (
    <ChartContainer
      title='Goal Progress'
      description='Track your progress towards your goals'
    >
      <ProgressRingChart
        progress={75}
        size={120}
        strokeWidth={8}
        config={{
          animated: true,
          duration: 1000,
          gradient: false,
        }}
        showLabel={true}
        label='Completion Rate'
      />
    </ChartContainer>
  );
}
