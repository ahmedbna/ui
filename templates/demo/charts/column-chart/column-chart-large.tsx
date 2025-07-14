import { ColumnChart } from '@/components/charts/column-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const largeSampleData = [
  { label: 'E-commerce', value: 2840, color: '#ff0066' },
  { label: 'AI', value: 2440, color: '#ff9900' },
  { label: 'Healthcare', value: 2150, color: '#00e6cc' },
  { label: 'Education', value: 1920, color: '#0099ff' },
  { label: 'Finance', value: 1780, color: '#ffcc00' },
  { label: 'Real Estate', value: 1650, color: '#9933ff' },
  { label: 'Travel', value: 1420, color: '#ff0080' },
  { label: 'Food & Dining', value: 1380, color: '#00cc66' },
  { label: 'Entertainment', value: 1250, color: '#ff6600' },
  { label: 'Sports', value: 1180, color: '#3399ff' },
  { label: 'Technology', value: 1050, color: '#cc66ff' },
  { label: 'Fashion', value: 980, color: '#ff3030' },
  { label: 'Automotive', value: 875, color: '#ff9900' },
  { label: 'Home & Garden', value: 720, color: '#0066ff' },
  { label: 'Beauty', value: 650, color: '#ff3366' },
  { label: 'Pets', value: 580, color: '#00ffcc' },
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
          duration: 4000,
        }}
      />
    </ChartContainer>
  );
}
