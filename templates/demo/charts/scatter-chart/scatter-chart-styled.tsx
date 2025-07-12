import { ScatterPlot } from '@/components/charts/scatter-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { x: 20, y: 80, label: 'High Performance' },
  { x: 35, y: 65, label: 'Good Performance' },
  { x: 50, y: 70, label: 'Average Performance' },
  { x: 65, y: 45, label: 'Below Average' },
  { x: 80, y: 55, label: 'Improving' },
  { x: 25, y: 90, label: 'Excellent' },
  { x: 75, y: 35, label: 'Needs Work' },
  { x: 60, y: 85, label: 'Outstanding' },
];

export function ScatterChartStyled() {
  return (
    <ChartContainer
      title='Styled Performance Analysis'
      description='Customized scatter plot with enhanced styling'
    >
      <ScatterPlot
        data={sampleData}
        config={{
          height: 320,
          padding: 30,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1200,
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}
      />
    </ChartContainer>
  );
}
