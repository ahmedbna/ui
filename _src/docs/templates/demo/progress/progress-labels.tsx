import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function ProgressLabels() {
  const tasks = [
    { label: 'Installing dependencies', progress: 100 },
    { label: 'Building application', progress: 75 },
    { label: 'Running tests', progress: 45 },
    { label: 'Deploying to production', progress: 0 },
  ];

  return (
    <View style={{ gap: 20 }}>
      {tasks.map((task, index) => (
        <View key={index} style={{ gap: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text variant='body' style={{ fontWeight: '500' }}>
              {task.label}
            </Text>
            <Text variant='caption' style={{ color: '#666' }}>
              {task.progress}%
            </Text>
          </View>
          <Progress value={task.progress} height={6} />
        </View>
      ))}

      <View style={{ gap: 8, marginTop: 12 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant='title' style={{ fontWeight: '600' }}>
            Overall Progress
          </Text>
          <Text variant='body' style={{ fontWeight: '500' }}>
            55%
          </Text>
        </View>
        <Progress value={55} height={10} />
        <Text variant='caption' style={{ color: '#666' }}>
          2 of 4 tasks completed
        </Text>
      </View>
    </View>
  );
}
