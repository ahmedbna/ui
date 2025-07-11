import { RadialBarChart } from '@/components/charts/radial-bar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { label: 'Mobile', value: 45 },
  { label: 'Desktop', value: 38 },
  { label: 'Tablet', value: 17 },
];

export function RadialBarChartSample() {
  const blue = useThemeColor({}, 'blue');
  const green = useThemeColor({}, 'green');
  const orange = useThemeColor({}, 'orange');

  const dataWithColors = sampleData.map((item, index) => ({
    ...item,
    color: [blue, green, orange][index],
  }));

  return (
    <ChartContainer
      title='Device Usage'
      description='User engagement by device type'
    >
      <RadialBarChart
        data={dataWithColors}
        config={{
          animated: true,
          duration: 1200,
          padding: 25,
        }}
      />
    </ChartContainer>
  );
}
