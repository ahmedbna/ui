import { AreaChart } from '@/components/charts/area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { x: 'Week 1', y: 850, label: 'Week 1' },
  { x: 'Week 2', y: 1200, label: 'Week 2' },
  { x: 'Week 3', y: 980, label: 'Week 3' },
  { x: 'Week 4', y: 1450, label: 'Week 4' },
  { x: 'Week 5', y: 1100, label: 'Week 5' },
  { x: 'Week 6', y: 1650, label: 'Week 6' },
];

export function AreaChartStyled() {
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'card');

  return (
    <ChartContainer
      title='Weekly Sales Volume'
      description='Styled area chart with custom appearance'
      style={{
        borderWidth: 1,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        margin: 8,
      }}
    >
      <AreaChart
        data={sampleData}
        config={{
          height: 220,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1800,
          showYLabels: true,
          yLabelCount: 6,
          padding: 24,
        }}
      />
    </ChartContainer>
  );
}
