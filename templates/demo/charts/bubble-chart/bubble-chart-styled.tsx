import { ChartContainer } from '@/components/charts/chart-container';
import { BubbleChart } from '@/components/charts/bubble-chart';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const styledData = [
  { x: 15, y: 25, size: 40, label: 'Q1', color: '#FF6B6B' },
  { x: 30, y: 35, size: 50, label: 'Q2', color: '#4ECDC4' },
  { x: 45, y: 30, size: 35, label: 'Q3', color: '#45B7D1' },
  { x: 60, y: 45, size: 45, label: 'Q4', color: '#96CEB4' },
  { x: 25, y: 50, size: 25, label: 'Bonus', color: '#FFEAA7' },
];

export function BubbleChartStyled() {
  const backgroundColor = useThemeColor({}, 'card');

  return (
    <ChartContainer
      title='Quarterly Revenue'
      description='Styled bubble chart with custom colors and enhanced visuals'
    >
      <BubbleChart
        data={styledData}
        config={{
          height: 280,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1800,
        }}
        style={{
          backgroundColor,
          borderRadius: 12,
          padding: 8,
        }}
      />
    </ChartContainer>
  );
}
