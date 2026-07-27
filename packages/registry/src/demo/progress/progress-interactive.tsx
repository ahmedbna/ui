import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ProgressInteractive() {
  const [value, setValue] = useState(45);
  const [isSeking, setIsSeeking] = useState(false);

  return (
    <View style={{ gap: 12 }}>
      <Text variant='body' style={{ color: '#666' }}>
        {isSeking ? 'Seeking...' : `Progress: ${Math.round(value)}%`}
      </Text>
      <Progress
        value={value}
        interactive
        height={18}
        onValueChange={setValue}
        onSeekStart={() => setIsSeeking(true)}
        onSeekEnd={() => setIsSeeking(false)}
      />
      <Text variant='caption' style={{ color: '#999' }}>
        Tap or drag to adjust the progress
      </Text>
    </View>
  );
}
