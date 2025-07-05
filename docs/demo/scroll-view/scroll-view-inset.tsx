import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function ScrollViewInset() {
  const card = useThemeColor({}, 'card');

  return (
    <View style={{ gap: 16 }}>
      {/* Standard ScrollView */}
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
          Standard Content
        </Text>
        <View
          style={{
            height: 150,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: BORDER_RADIUS,
          }}
        >
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <Text
                key={i}
                style={{
                  padding: 12,
                  marginBottom: 8,
                  backgroundColor: card,
                  borderRadius: BORDER_RADIUS,
                }}
              >
                Standard item {i + 1}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* ScrollView with content inset */}
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
          With Content Inset Adjustments
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
            contentContainerStyle={{
              paddingTop: 32,
              paddingBottom: 32,
              paddingHorizontal: 24,
            }}
            contentInset={{ top: 20, bottom: 20 }}
            contentInsetAdjustmentBehavior='automatic'
          >
            <View
              style={{
                padding: 16,
                backgroundColor: '#ddd6fe',
                borderRadius: BORDER_RADIUS,
                marginBottom: 16,
                borderWidth: 2,
                borderColor: '#8b5cf6',
              }}
            >
              <Text style={{ fontWeight: 'bold', color: '#5b21b6' }}>
                Header with Inset
              </Text>
            </View>

            {Array.from({ length: 6 }, (_, i) => (
              <Text
                key={i}
                style={{
                  padding: 12,
                  marginBottom: 8,
                  backgroundColor: '#fef3c7',
                  borderRadius: BORDER_RADIUS,
                  borderLeftWidth: 3,
                  borderLeftColor: '#f59e0b',
                }}
              >
                Inset adjusted item {i + 1}
              </Text>
            ))}

            <View
              style={{
                padding: 16,
                backgroundColor: '#dcfce7',
                borderRadius: BORDER_RADIUS,
                marginTop: 8,
                borderWidth: 2,
                borderColor: '#22c55e',
              }}
            >
              <Text style={{ fontWeight: 'bold', color: '#15803d' }}>
                Footer with Inset
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
