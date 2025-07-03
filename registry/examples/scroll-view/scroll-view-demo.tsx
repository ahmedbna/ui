import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function ScrollViewDemo() {
  const card = useThemeColor({}, 'card');

  return (
    <View
      style={{
        height: 200,
        borderWidth: 1,
        borderColor: card,
        borderRadius: BORDER_RADIUS,
      }}
    >
      <ScrollView style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text
            key={i}
            style={{
              marginBottom: 8,
              padding: 12,
              backgroundColor: card,
              borderRadius: 6,
            }}
          >
            Scrollable item {i + 1}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
