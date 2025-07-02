import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function ScrollViewHorizontal() {
  const gradients = [
    ['#ff9a9e', '#fecfef'],
    ['#a18cd1', '#fbc2eb'],
    ['#fad0c4', '#ffd1ff'],
    ['#ffecd2', '#fcb69f'],
    ['#a8edea', '#fed6e3'],
    ['#d299c2', '#fef9d7'],
    ['#89f7fe', '#66a6ff'],
  ];

  return (
    <View
      style={{
        height: 150,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: BORDER_RADIUS,
      }}
    >
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ padding: 16, gap: 16, alignItems: 'center' }}
        showsHorizontalScrollIndicator={true}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <View
            key={i}
            style={{
              width: 120,
              height: 100,
              backgroundColor: gradients[i % gradients.length][0],
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
              Item {i + 1}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
