import { DoughnutChart } from '@/components/charts/doughnut-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const largeDataset = [
  { label: 'E-commerce', value: 285, color: '#FF6B6B' },
  { label: 'Social Media', value: 245, color: '#4ECDC4' },
  { label: 'Search Engine', value: 198, color: '#45B7D1' },
  { label: 'Email Marketing', value: 156, color: '#96CEB4' },
  { label: 'Direct Traffic', value: 134, color: '#FFEAA7' },
  { label: 'Referral', value: 89, color: '#DDA0DD' },
  { label: 'Display Ads', value: 67, color: '#98D8C8' },
  { label: 'Video Ads', value: 45, color: '#F7DC6F' },
  { label: 'Affiliate', value: 23, color: '#BB8FCE' },
  { label: 'Other', value: 18, color: '#AED6F1' },
];

export function DoughnutChartLarge() {
  return (
    <ChartContainer
      title='Traffic Sources'
      description='Website traffic breakdown by source (last 30 days)'
    >
      <DoughnutChart
        data={largeDataset}
        config={{
          height: 320,
          showLabels: false, // Disable labels for large datasets
          animated: true,
          duration: 1200,
          innerRadius: 0.4,
        }}
      />
    </ChartContainer>
  );
}
