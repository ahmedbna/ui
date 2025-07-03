import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function ScrollViewIndicators() {
  const card = useThemeColor({}, 'card');

  return (
    <View style={{ gap: 16 }}>
      {/* Vertical with indicators */}
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
          With Scroll Indicators
        </Text>
        <View
          style={{
            height: 200,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: BORDER_RADIUS,
          }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 16, gap: 8 }}
            showsVerticalScrollIndicator={true}
            indicatorStyle='white'
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Text
                key={i}
                style={{
                  padding: 12,
                  backgroundColor: card,
                  borderRadius: BORDER_RADIUS,
                }}
              >
                Item {i + 1} - Scroll indicators visible
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Horizontal without indicators */}
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
          Without Scroll Indicators
        </Text>
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
            contentContainerStyle={{
              padding: 16,
              gap: 12,
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
          >
            {Array.from({ length: 8 }, (_, i) => (
              <View
                key={i}
                style={{
                  width: 80,
                  height: 60,
                  backgroundColor: '#fbbf24',
                  borderRadius: BORDER_RADIUS,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {i + 1}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
