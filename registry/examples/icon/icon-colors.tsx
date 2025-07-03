import { Icon } from '@/components/ui/icon';
import { View } from '@/components/ui/view';
import { Circle } from 'lucide-react-native';
import React from 'react';

export function IconColors() {
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FECA57', // Yellow
    '#FF9FF3', // Pink
    '#54A0FF', // Light Blue
    '#5F27CD', // Purple
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      {colors.map((color, index) => (
        <Icon
          key={index}
          name={Circle}
          size={24}
          color={color}
          fill={color}
          fillOpacity={0.2}
        />
      ))}
    </View>
  );
}
