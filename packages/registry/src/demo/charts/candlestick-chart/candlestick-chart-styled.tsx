import { ChartContainer } from '@/components/charts/chart-container';
import { CandlestickChart } from '@/components/charts/candlestick-chart';
import React from 'react';

const styledData = [
  { date: 'Q1', open: 250, high: 280, low: 240, close: 275 },
  { date: 'Q2', open: 275, high: 300, low: 260, close: 285 },
  { date: 'Q3', open: 285, high: 320, low: 275, close: 310 },
  { date: 'Q4', open: 310, high: 340, low: 295, close: 325 },
  { date: 'Q1', open: 325, high: 350, low: 315, close: 340 },
  { date: 'Q2', open: 340, high: 365, low: 330, close: 355 },
];

export function CandlestickChartStyled() {
  return (
    <ChartContainer
      title='Quarterly Performance'
      description='Custom styled candlestick chart with quarterly data'
    >
      <CandlestickChart
        data={styledData}
        config={{
          height: 280,
          padding: 30,
          showGrid: true,
          showLabels: true,
          animated: true,
          duration: 2000,
        }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: 12,
          padding: 16,
        }}
      />
    </ChartContainer>
  );
}
