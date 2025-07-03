import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';

export function ScrollViewRefresh() {
  const card = useThemeColor({}, 'card');
  const green = useThemeColor({}, 'green');

  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(
    new Date().toLocaleTimeString()
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefresh(new Date().toLocaleTimeString());
    }, 2000);
  }, []);

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
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            padding: 16,
            backgroundColor: green,
            borderRadius: BORDER_RADIUS,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontWeight: 'bold', color: '#000', marginBottom: 4 }}>
            Pull to Refresh
          </Text>
          <Text style={{ color: '#047857' }}>
            Last refreshed: {lastRefresh}
          </Text>
        </View>

        {Array.from({ length: 15 }, (_, i) => (
          <View
            key={i}
            style={{
              padding: 16,
              backgroundColor: card,
              borderRadius: BORDER_RADIUS,
              marginBottom: 8,
              borderLeftWidth: 4,
              borderLeftColor: '#3b82f6',
            }}
          >
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>
              News Item {i + 1}
            </Text>
            <Text style={{ color: '#6b7280' }}>
              This is a sample news item that demonstrates the pull-to-refresh
              functionality.
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
