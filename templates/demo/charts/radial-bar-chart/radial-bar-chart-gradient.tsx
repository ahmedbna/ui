import { RadialBarChart } from '@/components/charts/radial-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { label: 'Q1 Revenue', value: 85 },
  { label: 'Q2 Revenue', value: 92 },
  { label: 'Q3 Revenue', value: 78 },
  { label: 'Q4 Revenue', value: 96 },
];

export function RadialBarChartGradient() {
  const purple = useThemeColor({}, 'purple');
  const pink = useThemeColor({}, 'pink');
  const blue = useThemeColor({}, 'blue');
  const green = useThemeColor({}, 'green');

  const dataWithColors = sampleData.map((item, index) => ({
    ...item,
    color: [purple, pink, blue, green][index],
  }));

  return (
    <ChartContainer
      title='Quarterly Revenue'
      description='Revenue performance with gradient effects'
    >
      <RadialBarChart
        data={dataWithColors}
        config={{
          animated: true,
          duration: 1500,
          gradient: true,
          padding: 30,
        }}
      />
    </ChartContainer>
  );
}
