import { StackedAreaChart } from '@/components/charts/stacked-area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const generateLargeDataset = () => {
  const data = [];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  for (let i = 0; i < 12; i++) {
    data.push({
      x: i + 1,
      y: [
        Math.floor(Math.random() * 50) + 100, // Desktop
        Math.floor(Math.random() * 80) + 120, // Mobile
        Math.floor(Math.random() * 40) + 60, // Tablet
        Math.floor(Math.random() * 30) + 40, // TV
        Math.floor(Math.random() * 20) + 20, // Watch
      ],
      label: months[i],
    });
  }

  return data;
};

const sampleData = generateLargeDataset();
const categories = ['Desktop', 'Mobile', 'Tablet', 'TV', 'Watch'];

export function StackedAreaChartLarge() {
  return (
    <ChartContainer
      title='Device Usage Analytics'
      description='Monthly active users across different device types'
    >
      <StackedAreaChart
        data={sampleData}
        categories={categories}
        colors={['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
        config={{
          height: 350,
          padding: 25,
          showLabels: true,
          showGrid: true,
          animated: true,
          duration: 2000,
        }}
      />
    </ChartContainer>
  );
}
