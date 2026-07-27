import { TreeMapChart } from '@/components/charts/treemap-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const styledData = [
  { label: 'Mobile', value: 450, color: '#FF6B6B' },
  { label: 'Desktop', value: 320, color: '#4ECDC4' },
  { label: 'Tablet', value: 180, color: '#45B7D1' },
  { label: 'Watch', value: 90, color: '#FFA07A' },
  { label: 'TV', value: 150, color: '#98D8C8' },
  { label: 'Other', value: 60, color: '#F7DC6F' },
];

export function TreeMapChartStyled() {
  return (
    <ChartContainer
      title='Device Usage Analytics'
      description='User engagement across different device types'
    >
      <TreeMapChart
        data={styledData}
        config={{
          height: 350,
          padding: 15,
          showLabels: true,
          animated: true,
          duration: 1200,
        }}
      />
    </ChartContainer>
  );
}
