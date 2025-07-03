import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BadgeNotifications() {
  return (
    <View style={{ gap: 16 }}>
      {/* Small notification counters */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text>Messages</Text>
          <Badge
            style={{
              minWidth: 20,
              height: 20,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
            textStyle={{ fontSize: 12 }}
          >
            3
          </Badge>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text>Notifications</Text>
          <Badge
            variant='destructive'
            style={{
              width: 20,
              height: 20,
              paddingHorizontal: 0,
              paddingVertical: 0,
              borderRadius: 999,
            }}
            textStyle={{ fontSize: 12 }}
          >
            12
          </Badge>
        </View>
      </View>

      {/* Dot indicators */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text>Online</Text>
          <Badge
            variant='success'
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          >
            <View />
          </Badge>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text>Away</Text>
          <Badge
            style={{
              backgroundColor: '#f59e0b',
              width: 8,
              height: 8,
              borderRadius: 4,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          >
            <View />
          </Badge>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text>Offline</Text>
          <Badge
            variant='outline'
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          >
            <View />
          </Badge>
        </View>
      </View>
    </View>
  );
}
