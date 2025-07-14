import { RadarChart } from '@/components/charts/radar-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const performanceData = [
  { label: 'Innovation', value: 88 },
  { label: 'Quality', value: 92 },
  { label: 'Delivery', value: 85 },
  { label: 'Customer Satisfaction', value: 90 },
  { label: 'Cost Efficiency', value: 78 },
  { label: 'Team Collaboration', value: 95 },
  { label: 'Process Improvement', value: 82 },
];

export function RadarChartStyled() {
  const accentColor = useThemeColor({}, 'accent');

  return (
    <ChartContainer
      title='Team Performance Matrix'
      description='Comprehensive evaluation across key performance indicators'
    >
      <RadarChart
        data={performanceData}
        config={{
          height: 350,
          showLabels: true,
          animated: true,
          duration: 1500,
          maxValue: 100,
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
