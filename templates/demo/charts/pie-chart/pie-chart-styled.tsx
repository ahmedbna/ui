import { PieChart } from '@/components/charts/pie-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

export function PieChartStyled() {
  const primaryColor = useThemeColor({}, 'primary');
  const successColor = useThemeColor({}, 'green');
  const warningColor = useThemeColor({}, 'orange');
  const errorColor = useThemeColor({}, 'red');

  const styledData = [
    { label: 'Completed', value: 65, color: successColor },
    { label: 'In Progress', value: 20, color: primaryColor },
    { label: 'Pending', value: 10, color: warningColor },
    { label: 'Failed', value: 5, color: errorColor },
  ];

  return (
    <ChartContainer
      title='Project Status'
      description='Current project completion status overview'
    >
      <PieChart
        data={styledData}
        config={{
          height: 280,
          showLabels: true,
          animated: true,
          duration: 1200,
        }}
      />
    </ChartContainer>
  );
}
