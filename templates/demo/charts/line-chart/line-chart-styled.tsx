import { ChartContainer } from '@/components/charts/chart-container';
import { LineChart } from '@/components/charts/line-chart';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { x: 'Mon', y: 23, label: 'Monday' },
  { x: 'Tue', y: 45, label: 'Tuesday' },
  { x: 'Wed', y: 67, label: 'Wednesday' },
  { x: 'Thu', y: 34, label: 'Thursday' },
  { x: 'Fri', y: 89, label: 'Friday' },
  { x: 'Sat', y: 56, label: 'Saturday' },
  { x: 'Sun', y: 78, label: 'Sunday' },
];

export function LineChartStyled() {
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'card');

  return (
    <ChartContainer
      title='Weekly Performance'
      description='Styled chart with custom appearance'
      style={{
        borderWidth: 1,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <LineChart
        data={sampleData}
        config={{
          height: 200,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 2000,
          showYLabels: true,
          yLabelCount: 4,
          padding: 24,
        }}
      />
    </ChartContainer>
  );
}
