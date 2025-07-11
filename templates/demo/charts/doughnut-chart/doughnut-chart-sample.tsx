import { DoughnutChart } from '@/components/charts/doughnut-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const sampleData = [
  { label: 'Revenue', value: 45000 },
  { label: 'Expenses', value: 32000 },
  { label: 'Profit', value: 13000 },
];

export function DoughnutChartSample() {
  const primaryColor = useThemeColor({}, 'primary');
  const greenColor = useThemeColor({}, 'green');
  const orangeColor = useThemeColor({}, 'orange');

  const dataWithColors = [
    { ...sampleData[0], color: primaryColor },
    { ...sampleData[1], color: orangeColor },
    { ...sampleData[2], color: greenColor },
  ];

  return (
    <ChartContainer
      title='Financial Overview'
      description='Q4 2024 financial breakdown'
    >
      <DoughnutChart
        data={dataWithColors}
        config={{
          height: 250,
          showLabels: true,
          animated: true,
          duration: 1500,
          innerRadius: 0.5,
        }}
      />
    </ChartContainer>
  );
}
