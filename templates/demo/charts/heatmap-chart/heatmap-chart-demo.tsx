import { HeatmapChart } from '@/components/charts/heatmap-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const sampleData = [
  { row: 'Mon', col: 'Morning', value: 45 },
  { row: 'Mon', col: 'Afternoon', value: 62 },
  { row: 'Mon', col: 'Evening', value: 38 },
  { row: 'Tue', col: 'Morning', value: 52 },
  { row: 'Tue', col: 'Afternoon', value: 71 },
  { row: 'Tue', col: 'Evening', value: 43 },
  { row: 'Wed', col: 'Morning', value: 39 },
  { row: 'Wed', col: 'Afternoon', value: 85 },
  { row: 'Wed', col: 'Evening', value: 57 },
  { row: 'Thu', col: 'Morning', value: 68 },
  { row: 'Thu', col: 'Afternoon', value: 92 },
  { row: 'Thu', col: 'Evening', value: 61 },
  { row: 'Fri', col: 'Morning', value: 73 },
  { row: 'Fri', col: 'Afternoon', value: 88 },
  { row: 'Fri', col: 'Evening', value: 79 },
];

export function HeatmapChartDemo() {
  return (
    <ChartContainer
      title='Weekly Activity Heatmap'
      description='Activity levels throughout the week by time of day'
    >
      <HeatmapChart
        data={sampleData}
        config={{
          height: 300,
          showLabels: true,
          animated: true,
          duration: 1000,
          colorScale: ['#e0f2fe', '#0369a1', '#1e3a8a'],
        }}
      />
    </ChartContainer>
  );
}
