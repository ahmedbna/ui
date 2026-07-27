import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ButtonAnimation() {
  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ marginBottom: 8, fontSize: 14, color: '#71717a' }}>
          With Animation (default)
        </Text>
        <Button animation={true} onPress={() => {}}>
          Animated Button
        </Button>
      </View>

      <View>
        <Text style={{ marginBottom: 8, fontSize: 14, color: '#71717a' }}>
          Without Animation
        </Text>
        <Button animation={false} onPress={() => {}}>
          Static Button
        </Button>
      </View>
    </View>
  );
}
