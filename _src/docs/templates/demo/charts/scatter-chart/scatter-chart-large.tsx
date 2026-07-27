import { ScatterPlot } from '@/components/charts/scatter-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

// Generate a larger dataset for demonstration
const generateLargeDataset = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      label: `Point ${i + 1}`,
    });
  }
  return data;
};

const largeDataset = generateLargeDataset();

export function ScatterChartLarge() {
  return (
    <ChartContainer
      title='Large Dataset Visualization'
      description='Scatter plot with 30 data points showing distribution patterns'
    >
      <ScatterPlot
        data={largeDataset}
        config={{
          height: 400,
          padding: 25,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1500,
        }}
      />
    </ChartContainer>
  );
}
