import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ScrollViewStyled() {
  return (
    <View style={{ height: 300, borderRadius: 16, overflow: 'hidden' }}>
      <ScrollView
        style={{
          backgroundColor: '#1f2937',
          borderRadius: 16,
        }}
        contentContainerStyle={{
          padding: 20,
          gap: 16,
        }}
        showsVerticalScrollIndicator={true}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: '#374151',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#4b5563',
          }}
        >
          <Text
            style={{
              color: '#f9fafb',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 8,
            }}
          >
            🌙 Dark Theme ScrollView
          </Text>
          <Text style={{ color: '#d1d5db' }}>
            This ScrollView uses custom dark styling with rounded corners and
            shadows.
          </Text>
        </View>

        {Array.from({ length: 12 }, (_, i) => (
          <View
            key={i}
            style={{
              padding: 16,
              backgroundColor: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                marginBottom: 4,
              }}
            >
              Card {i + 1}
            </Text>
            <Text style={{ color: '#e5e7eb', opacity: 0.9 }}>
              Beautiful custom styled card with gradient-like colors and
              shadows.
            </Text>
          </View>
        ))}

        <View
          style={{
            padding: 20,
            backgroundColor: '#059669',
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            ✨ End of styled content
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
