import { PolarAreaChart } from '@/components/charts/polar-area-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

const marketData = [
  { label: 'Mobile Apps', value: 45, color: '#FF6B6B' },
  { label: 'Web Apps', value: 38, color: '#4ECDC4' },
  { label: 'Desktop', value: 25, color: '#45B7D1' },
  { label: 'IoT', value: 18, color: '#96CEB4' },
  { label: 'AI/ML', value: 32, color: '#FFEAA7' },
  { label: 'Blockchain', value: 15, color: '#DDA0DD' },
];

export function PolarAreaChartStyled() {
  return (
    <ChartContainer
      title='Market Share Analysis'
      description='Technology sector market distribution'
    >
      <PolarAreaChart
        data={marketData}
        config={{
          height: 320,
          showLabels: true,
          animated: true,
          duration: 1500,
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
