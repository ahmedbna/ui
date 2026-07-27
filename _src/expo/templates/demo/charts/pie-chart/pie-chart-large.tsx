import { PieChart } from '@/components/charts/pie-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const largeData = [
  { label: 'North America', value: 35 },
  { label: 'Europe', value: 28 },
  { label: 'Asia Pacific', value: 22 },
  { label: 'Latin America', value: 8 },
  { label: 'Middle East', value: 4 },
  { label: 'Africa', value: 3 },
];

export function PieChartLarge() {
  return (
    <ChartContainer
      title='Global Revenue Distribution'
      description='Revenue breakdown by geographical regions'
    >
      <PieChart
        data={largeData}
        config={{
          height: 350,
          showLabels: true,
          animated: true,
          duration: 1500,
        }}
      />
    </ChartContainer>
  );
}
