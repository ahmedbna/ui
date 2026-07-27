import { ProgressRingChart } from '@/components/charts/progress-ring-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

export function ProgressRingChartLarge() {
  return (
    <ChartContainer
      title='Annual Revenue Target'
      description='Track progress towards annual revenue goals'
    >
      <ProgressRingChart
        progress={87}
        size={200}
        strokeWidth={16}
        config={{
          animated: true,
          duration: 2500,
          gradient: true,
        }}
        showLabel={true}
        label='Revenue Target'
        centerText='$2.6M'
      />
    </ChartContainer>
  );
}
