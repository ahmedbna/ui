import { HeatmapChart } from '@/components/charts/heatmap-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { row: 'Low', col: 'Low', value: 10 },
  { row: 'Low', col: 'Medium', value: 25 },
  { row: 'Low', col: 'High', value: 40 },
  { row: 'Medium', col: 'Low', value: 30 },
  { row: 'Medium', col: 'Medium', value: 55 },
  { row: 'Medium', col: 'High', value: 70 },
  { row: 'High', col: 'Low', value: 50 },
  { row: 'High', col: 'Medium', value: 75 },
  { row: 'High', col: 'High', value: 95 },
];

export function HeatmapChartStyled() {
  const isDark = useThemeColor({}, 'background') === '#000000';

  const colorScale = isDark
    ? ['#0f172a', '#1e293b', '#334155', '#64748b', '#94a3b8']
    : ['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b'];

  return (
    <ChartContainer
      title='Risk Assessment Matrix'
      description='Risk levels across different probability and impact combinations'
    >
      <HeatmapChart
        data={sampleData}
        config={{
          height: 250,
          showLabels: true,
          animated: true,
          duration: 1200,
          colorScale,
          padding: 30,
        }}
      />
    </ChartContainer>
  );
}
