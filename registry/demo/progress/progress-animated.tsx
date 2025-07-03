import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useEffect, useState } from 'react';

export function ProgressAnimated() {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

  useEffect(() => {
    // Animate first progress bar
    const timer1 = setTimeout(() => setProgress1(75), 500);

    // Animate second progress bar
    const timer2 = setTimeout(() => setProgress2(60), 1000);

    // Animate third progress bar
    const timer3 = setTimeout(() => setProgress3(85), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const [cycleProgress, setCycleProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleProgress((prev) => {
        const newValue = prev + 10;
        return newValue > 100 ? 0 : newValue;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 12 }}>
        <Text variant='title'>Staggered Animation</Text>

        <View style={{ gap: 8 }}>
          <Text variant='caption'>File Upload: {progress1}%</Text>
          <Progress value={progress1} height={6} />
        </View>

        <View style={{ gap: 8 }}>
          <Text variant='caption'>Processing: {progress2}%</Text>
          <Progress value={progress2} height={6} />
        </View>

        <View style={{ gap: 8 }}>
          <Text variant='caption'>Optimization: {progress3}%</Text>
          <Progress value={progress3} height={6} />
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text variant='title'>Continuous Animation</Text>
        <View style={{ gap: 8 }}>
          <Text variant='caption'>Loading: {cycleProgress}%</Text>
          <Progress value={cycleProgress} height={8} />
        </View>
      </View>
    </View>
  );
}
