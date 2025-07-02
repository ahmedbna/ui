import { Icon } from '@/components/ui/icon';
import { View } from '@/components/ui/view';
import { Star } from 'lucide-react-native';
import React from 'react';

export function IconSizes() {
  const sizes = [16, 20, 24, 32, 40, 48];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      {sizes.map((size) => (
        <Icon key={size} name={Star} size={size} color='#FFD700' />
      ))}
    </View>
  );
}
