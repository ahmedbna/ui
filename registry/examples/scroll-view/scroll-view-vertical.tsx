import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function ScrollViewVertical() {
  const colors = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
  ];

  return (
    <View
      style={{
        height: 300,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: BORDER_RADIUS,
      }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 12 }}
        showsVerticalScrollIndicator={true}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <View
            key={i}
            style={{
              height: 80,
              backgroundColor: colors[i % colors.length],
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
              Card {i + 1}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
