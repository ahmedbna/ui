import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function BadgeIcons() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <Badge>★ Featured</Badge>

      <Badge variant='success'>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 12 }}>✓</Text>
          <Text>Verified</Text>
        </View>
      </Badge>

      <Badge variant='destructive'>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 12 }}>⚠</Text>
          <Text>Alert</Text>
        </View>
      </Badge>

      <Badge variant='outline'>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 12 }}>🔔</Text>
          <Text>Notification</Text>
        </View>
      </Badge>
    </View>
  );
}
