import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Monitor, Moon, Palette, Sun } from 'lucide-react-native';
import React from 'react';

export function IconThemed() {
  const themedIcons = [
    {
      icon: Sun,
      label: 'Light Theme',
      lightColor: '#FFA500',
      darkColor: '#FFD700',
    },
    {
      icon: Moon,
      label: 'Dark Theme',
      lightColor: '#4A5568',
      darkColor: '#E2E8F0',
    },
    {
      icon: Monitor,
      label: 'System',
      lightColor: '#2D3748',
      darkColor: '#F7FAFC',
    },
    {
      icon: Palette,
      label: 'Custom',
      lightColor: '#E53E3E',
      darkColor: '#FC8181',
    },
  ];

  return (
    <View style={{ gap: 16 }}>
      {themedIcons.map(({ icon, label, lightColor, darkColor }, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Icon
            name={icon}
            size={24}
            lightColor={lightColor}
            darkColor={darkColor}
          />
          <Text variant='body'>{label}</Text>
        </View>
      ))}
    </View>
  );
}
