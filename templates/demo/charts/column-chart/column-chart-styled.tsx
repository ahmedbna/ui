import { ColumnChart } from '@/components/charts/column-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { label: 'Mobile', value: 45, color: '#3b82f6' },
  { label: 'Desktop', value: 35, color: '#10b981' },
  { label: 'Tablet', value: 15, color: '#f59e0b' },
  { label: 'Smart TV', value: 8, color: '#ef4444' },
  { label: 'Wearable', value: 3, color: '#8b5cf6' },
];

export function ColumnChartStyled() {
  return (
    <ChartContainer
      title='Device Usage Statistics'
      description='User engagement by device type with custom colors'
    >
      <ColumnChart
        data={sampleData}
        config={{
          height: 280,
          padding: 24,
          showLabels: true,
          animated: true,
          duration: 1200,
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 12,
          padding: 16,
        }}
      />
    </ChartContainer>
  );
}
