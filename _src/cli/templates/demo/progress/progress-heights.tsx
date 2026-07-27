import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ProgressHeights() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 6 }}>
        <Text variant='caption'>Small (2px)</Text>
        <Progress value={75} height={2} />
      </View>

      <View style={{ gap: 6 }}>
        <Text variant='caption'>Default (4px)</Text>
        <Progress value={60} />
      </View>

      <View style={{ gap: 6 }}>
        <Text variant='caption'>Medium (8px)</Text>
        <Progress value={45} height={8} />
      </View>

      <View style={{ gap: 6 }}>
        <Text variant='caption'>Large (12px)</Text>
        <Progress value={30} height={12} />
      </View>

      <View style={{ gap: 6 }}>
        <Text variant='caption'>Extra Large (20px)</Text>
        <Progress value={85} height={20} />
      </View>
    </View>
  );
}
