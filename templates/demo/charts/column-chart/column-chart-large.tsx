import { ColumnChart } from '@/components/charts/column-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const largeSampleData = [
  { label: 'E-commerce', value: 2840 },
  { label: 'Healthcare', value: 2150 },
  { label: 'Education', value: 1920 },
  { label: 'Finance', value: 1780 },
  { label: 'Real Estate', value: 1650 },
  { label: 'Travel', value: 1420 },
  { label: 'Food & Dining', value: 1380 },
  { label: 'Entertainment', value: 1250 },
  { label: 'Sports', value: 1180 },
  { label: 'Technology', value: 1050 },
  { label: 'Fashion', value: 980 },
  { label: 'Automotive', value: 875 },
  { label: 'Home & Garden', value: 720 },
  { label: 'Beauty', value: 650 },
  { label: 'Pets', value: 580 },
];

export function ColumnChartLarge() {
  return (
    <ChartContainer
      title='Industry Revenue Analysis'
      description='Annual revenue by industry sector (in millions)'
    >
      <ColumnChart
        data={largeSampleData}
        config={{
          height: 500,
          padding: 20,
          showLabels: true,
          animated: true,
          duration: 2000,
        }}
      />
    </ChartContainer>
  );
}
