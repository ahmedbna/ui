import { RadarChart } from '@/components/charts/radar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const skillsData = [
  { label: 'Frontend', value: 95 },
  { label: 'Backend', value: 82 },
  { label: 'Mobile', value: 78 },
  { label: 'DevOps', value: 65 },
  { label: 'Design', value: 70 },
];

export function RadarChartSample() {
  return (
    <ChartContainer
      title='Skills Assessment'
      description='Developer competency across different technology areas'
    >
      <RadarChart
        data={skillsData}
        config={{
          height: 250,
          showLabels: true,
          animated: true,
          duration: 1200,
          maxValue: 100,
        }}
      />
    </ChartContainer>
  );
}
