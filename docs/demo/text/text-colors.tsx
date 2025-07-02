import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function TextColors() {
  return (
    <View style={{ gap: 16 }}>
      <Text variant='subtitle' style={{ marginBottom: 8 }}>
        Custom Color Examples
      </Text>

      <Text variant='body' lightColor='#3b82f6' darkColor='#60a5fa'>
        This text uses custom blue colors for light and dark themes
      </Text>

      <Text variant='body' lightColor='#10b981' darkColor='#34d399'>
        This text uses custom green colors for light and dark themes
      </Text>

      <Text variant='body' lightColor='#f59e0b' darkColor='#fbbf24'>
        This text uses custom amber colors for light and dark themes
      </Text>

      <Text variant='body' lightColor='#ef4444' darkColor='#f87171'>
        This text uses custom red colors for light and dark themes
      </Text>

      <Text variant='body' lightColor='#8b5cf6' darkColor='#a78bfa'>
        This text uses custom purple colors for light and dark themes
      </Text>

      <View style={{ marginTop: 16 }}>
        <Text variant='caption'>
          Note: These colors automatically adapt based on the current theme
          (light/dark mode)
        </Text>
      </View>
    </View>
  );
}
