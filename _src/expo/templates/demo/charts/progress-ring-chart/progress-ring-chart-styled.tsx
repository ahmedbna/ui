import { ProgressRingChart } from '@/components/charts/progress-ring-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

export function ProgressRingChartStyled() {
  return (
    <ChartContainer
      title='Project Progress'
      description='Development milestone completion with gradient styling'
    >
      <ProgressRingChart
        progress={92}
        size={160}
        strokeWidth={12}
        config={{
          animated: true,
          duration: 2000,
          gradient: true,
        }}
        showLabel={true}
        label='Sprint Progress'
        centerText='92%'
      />
    </ChartContainer>
  );
}
