import { CandlestickChart } from '@/components/charts/candlestick-chart';
import React from 'react';

const minimalData = [
  { date: '10', open: 190, high: 205, low: 185, close: 200 },
  { date: '8', open: 170, high: 185, low: 165, close: 180 },
  { date: '9', open: 180, high: 195, low: 175, close: 170 },
  { date: '7', open: 160, high: 175, low: 155, close: 150 },
  { date: '6', open: 150, high: 165, low: 145, close: 160 },
  { date: '4', open: 130, high: 145, low: 125, close: 140 },
  { date: '2', open: 110, high: 125, low: 105, close: 120 },
  { date: '3', open: 120, high: 135, low: 115, close: 130 },
  { date: '5', open: 140, high: 155, low: 135, close: 150 },
  { date: '1', open: 100, high: 115, low: 95, close: 90 },
];

export function CandlestickChartMinimal() {
  return (
    <CandlestickChart
      data={minimalData}
      config={{
        height: 180,
        padding: 15,
        showGrid: false,
        showLabels: false,
        animated: true,
        duration: 1000,
      }}
    />
  );
}
