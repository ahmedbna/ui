import { Badge } from '@/components/ui/badge';
import { View } from '@/components/ui/view';
import React from 'react';

export function BadgeStyled() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {/* Custom colors */}
      <Badge
        style={{
          backgroundColor: '#8b5cf6',
          borderRadius: 16,
        }}
        textStyle={{ color: 'white', fontWeight: '600' }}
      >
        Purple
      </Badge>

      <Badge
        style={{
          backgroundColor: '#06b6d4',
          borderRadius: 4,
        }}
        textStyle={{ color: 'white', fontSize: 13 }}
      >
        Cyan
      </Badge>

      <Badge
        style={{
          backgroundColor: '#f97316',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        textStyle={{ color: 'white', fontWeight: 'bold' }}
      >
        Orange
      </Badge>

      {/* Gradient-like effect with shadow */}
      <Badge
        style={{
          backgroundColor: '#ec4899',
          borderRadius: 12,
          shadowColor: '#ec4899',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 4,
        }}
        textStyle={{ color: 'white', fontWeight: '600' }}
      >
        Pink
      </Badge>

      {/* Bordered with custom style */}
      <Badge
        variant='outline'
        style={{
          borderColor: '#10b981',
          borderWidth: 2,
          borderRadius: 8,
        }}
        textStyle={{ color: '#10b981', fontWeight: '600' }}
      >
        Green
      </Badge>
    </View>
  );
}
