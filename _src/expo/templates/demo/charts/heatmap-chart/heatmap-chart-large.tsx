import { HeatmapChart } from '@/components/charts/heatmap-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

// Generate large dataset
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
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  for (const month of months) {
    for (const hour of hours) {
      // Generate realistic activity data (higher during work hours)
      const isWorkHour = parseInt(hour) >= 8 && parseInt(hour) <= 18;
      const baseValue = isWorkHour ? 40 : 10;
      const randomVariation = Math.random() * 30;
      const value = Math.round(baseValue + randomVariation);

      data.push({
        row: month,
        col: `${hour}:00`,
        value,
      });
    }
  }

  return data;
};

const largeDataset = generateLargeDataset();

export function HeatmapChartLarge() {
  return (
    <ChartContainer
      title='Annual Activity Heatmap'
      description='User activity patterns throughout the year by hour of day'
    >
      <HeatmapChart
        data={largeDataset}
        config={{
          height: 400,
          showLabels: false, // Disabled for large datasets
          animated: true,
          duration: 1500,
          colorScale: ['#ecfdf5', '#10b981', '#065f46'],
          padding: 40,
        }}
      />
    </ChartContainer>
  );
}
