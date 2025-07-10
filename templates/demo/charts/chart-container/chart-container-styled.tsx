import { ChartContainer } from '@/components/charts/chart-container';
import { LineChart } from '@/components/charts/line-chart';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { x: 'Q1', y: 65, label: 'Quarter 1' },
  { x: 'Q2', y: 80, label: 'Quarter 2' },
  { x: 'Q3', y: 75, label: 'Quarter 3' },
  { x: 'Q4', y: 95, label: 'Quarter 4' },
];

export function ChartContainerStyled() {
  const backgroundColor = useThemeColor({}, 'indigo');

  return (
    <ChartContainer
      title='Quarterly Growth'
      description='Performance metrics by quarter'
      style={{
        borderWidth: 2,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: backgroundColor,
      }}
    >
      <LineChart
        data={sampleData}
        config={{
          height: 180,
          animated: true,
          showGrid: true,
          showLabels: true,
        }}
      />
    </ChartContainer>
  );
}
