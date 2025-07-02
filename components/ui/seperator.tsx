import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { ViewStyle } from 'react-native';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

export function Separator({
  orientation = 'horizontal',
  style,
}: SeparatorProps) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View
      style={[
        {
          backgroundColor: borderColor,
          ...(orientation === 'horizontal'
            ? { height: 1, width: '100%' }
            : { width: 1, height: '100%' }),
        },
        style,
      ]}
    />
  );
}
