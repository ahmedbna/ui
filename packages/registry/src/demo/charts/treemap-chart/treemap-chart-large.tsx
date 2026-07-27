import { TreeMapChart } from '@/components/charts/treemap-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const largeData = [
  { label: 'North America', value: 1250 },
  { label: 'Europe', value: 980 },
  { label: 'Asia Pacific', value: 1450 },
  { label: 'South America', value: 320 },
  { label: 'Africa', value: 180 },
  { label: 'Middle East', value: 240 },
  { label: 'Oceania', value: 95 },
  { label: 'Central Asia', value: 150 },
  { label: 'Caribbean', value: 85 },
  { label: 'Eastern Europe', value: 420 },
  { label: 'Nordic', value: 280 },
  { label: 'Southeast Asia', value: 650 },
  { label: 'East Africa', value: 120 },
  { label: 'West Africa', value: 200 },
  { label: 'Central America', value: 110 },
];

export function TreeMapChartLarge() {
  return (
    <ChartContainer
      title='Global Revenue Distribution'
      description='Revenue breakdown across global regions'
    >
      <TreeMapChart
        data={largeData}
        config={{
          height: 400,
          padding: 12,
          showLabels: true,
          animated: true,
          duration: 1500,
        }}
      />
    </ChartContainer>
  );
}
