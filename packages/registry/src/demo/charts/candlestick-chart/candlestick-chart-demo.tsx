import { ChartContainer } from '@/components/charts/chart-container';
import { CandlestickChart } from '@/components/charts/candlestick-chart';
import React from 'react';

const sampleData = [
  { date: 'Jan 1', open: 100, high: 120, low: 95, close: 110 },
  { date: 'Jan 2', open: 110, high: 125, low: 105, close: 115 },
  { date: 'Jan 3', open: 115, high: 130, low: 110, close: 125 },
  { date: 'Jan 4', open: 125, high: 140, low: 120, close: 135 },
  { date: 'Jan 5', open: 135, high: 145, low: 125, close: 128 },
  { date: 'Jan 6', open: 128, high: 135, low: 118, close: 132 },
  { date: 'Jan 7', open: 132, high: 142, low: 128, close: 138 },
  { date: 'Jan 8', open: 138, high: 148, low: 132, close: 145 },
  { date: 'Jan 9', open: 145, high: 155, low: 140, close: 150 },
  { date: 'Jan 10', open: 150, high: 160, low: 145, close: 155 },
];

export function CandlestickChartDemo() {
  return (
    <ChartContainer
      title='Stock Price Movement'
      description='Daily OHLC data showing price trends over time'
    >
      <CandlestickChart
        data={sampleData}
        config={{
          height: 220,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 1200,
        }}
      />
    </ChartContainer>
  );
}
