import { RadarChart } from '@/components/charts/radar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import React from 'react';

const comprehensiveData = [
  { label: 'Leadership', value: 85 },
  { label: 'Communication', value: 90 },
  { label: 'Technical Skills', value: 88 },
  { label: 'Problem Solving', value: 92 },
  { label: 'Creativity', value: 78 },
  { label: 'Adaptability', value: 86 },
  { label: 'Time Management', value: 82 },
  { label: 'Teamwork', value: 94 },
  { label: 'Strategic Thinking', value: 80 },
  { label: 'Customer Focus', value: 87 },
];

export function RadarChartLarge() {
  return (
    <ChartContainer
      title='360° Skills Assessment'
      description='Comprehensive evaluation across multiple competency areas'
    >
      <RadarChart
        data={comprehensiveData}
        config={{
          height: 400,
          showLabels: true,
          animated: true,
          duration: 2000,
          maxValue: 100,
        }}
      />
    </ChartContainer>
  );
}
