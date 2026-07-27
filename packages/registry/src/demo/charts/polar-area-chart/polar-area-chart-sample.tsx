import { PolarAreaChart } from '@/components/charts/polar-area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useColor } from '@/hooks/useColor';
import React from 'react';

const skillsData = [
  { label: 'JavaScript', value: 95 },
  { label: 'React', value: 88 },
  { label: 'TypeScript', value: 82 },
  { label: 'Node.js', value: 78 },
  { label: 'Python', value: 65 },
];

export function PolarAreaChartSample() {
  const primaryColor = useColor('primary');
  const blueColor = useColor('blue');
  const greenColor = useColor('green');
  const orangeColor = useColor('orange');
  const purpleColor = useColor('purple');

  const dataWithColors = skillsData.map((item, index) => ({
    ...item,
    color: [primaryColor, blueColor, greenColor, orangeColor, purpleColor][
      index
    ],
  }));

  return (
    <ChartContainer
      title='Skills Assessment'
      description='Technical skills proficiency levels'
    >
      <PolarAreaChart
        data={dataWithColors}
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
