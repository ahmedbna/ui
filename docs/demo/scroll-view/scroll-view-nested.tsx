import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function ScrollViewNested() {
  return (
    <View
      style={{
        height: 300,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: BORDER_RADIUS,
      }}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
          Vertical Scroll
        </Text>

        {Array.from({ length: 3 }, (_, sectionIndex) => (
          <View key={sectionIndex} style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
              Section {sectionIndex + 1}
            </Text>

            <View
              style={{
                height: 120,
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: BORDER_RADIUS,
              }}
            >
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  padding: 12,
                  gap: 12,
                  alignItems: 'center',
                }}
                showsHorizontalScrollIndicator={true}
              >
                {Array.from({ length: 8 }, (_, itemIndex) => (
                  <View
                    key={itemIndex}
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#3b82f6',
                      borderRadius: BORDER_RADIUS,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      {sectionIndex + 1}.{itemIndex + 1}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        ))}

        <Text
          style={{
            padding: 16,
            borderRadius: BORDER_RADIUS,
            textAlign: 'center',
          }}
        >
          End of scrollable content
        </Text>
      </ScrollView>
    </View>
  );
}
