import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Zap } from 'lucide-react-native';
import React from 'react';

export function IconStroke() {
  const strokeWeights = [
    { weight: 1, label: 'Light' },
    { weight: 1.5, label: 'Regular' },
    { weight: 2, label: 'Medium' },
    { weight: 2.5, label: 'Bold' },
  ];

  return (
    <View style={{ gap: 16 }}>
      {strokeWeights.map(({ weight, label }) => (
        <View
          key={weight}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Icon name={Zap} size={24} strokeWidth={weight} color='#F39C12' />
          <Text variant='body' style={{ minWidth: 60 }}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
}
