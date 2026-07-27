import { ChartContainer } from '@/components/charts/chart-container';
import { CandlestickChart } from '@/components/charts/candlestick-chart';
import React from 'react';

const sampleData = [
  { date: 'Week 1', open: 150, high: 165, low: 145, close: 160 },
  { date: 'Week 2', open: 160, high: 175, low: 155, close: 170 },
  { date: 'Week 3', open: 170, high: 185, low: 165, close: 180 },
  { date: 'Week 4', open: 180, high: 195, low: 175, close: 190 },
  { date: 'Week 5', open: 190, high: 205, low: 185, close: 200 },
  { date: 'Week 6', open: 200, high: 215, low: 195, close: 210 },
  { date: 'Week 7', open: 210, high: 225, low: 205, close: 220 },
  { date: 'Week 8', open: 220, high: 235, low: 215, close: 230 },
];

export function CandlestickChartSample() {
  return (
    <ChartContainer
      title='Stock Chart'
      description='Explore weekly price movements'
    >
      <CandlestickChart
        data={sampleData}
        config={{
          height: 250,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1500,
        }}
      />
    </ChartContainer>
  );
}
