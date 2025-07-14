import { ColumnChart } from '@/components/charts/column-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const sampleData = [
  { label: 'Q1 2024', value: 850 },
  { label: 'Q2 2024', value: 920 },
  { label: 'Q3 2024', value: 1100 },
  { label: 'Q4 2024', value: 1250 },
];

export function ColumnChartSample() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'muted');

  const enhancedData = sampleData.map((item, index) => ({
    ...item,
    color: selectedIndex === index ? primaryColor : mutedColor,
  }));

  return (
    <ChartContainer
      title='Interactive Revenue Chart'
      description='Tap on quarters to highlight them'
    >
      <ColumnChart
        data={enhancedData}
        config={{
          height: 250,
          showLabels: true,
          animated: true,
          duration: 600,
        }}
      />
      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {sampleData.map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              setSelectedIndex(selectedIndex === index ? null : index)
            }
            style={{
              padding: 8,
              backgroundColor:
                selectedIndex === index ? primaryColor : mutedColor,
              borderRadius: 6,
              minWidth: 60,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: selectedIndex === index ? 'white' : 'gray',
                fontSize: 12,
                fontWeight: '500',
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </ChartContainer>
  );
}
