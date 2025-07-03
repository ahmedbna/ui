import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/ui/view';
import React from 'react';

export function SkeletonSizes() {
  return (
    <View style={{ gap: 12 }}>
      <Skeleton width={100} height={16} />
      <Skeleton width={200} height={20} />
      <Skeleton width={300} height={24} />
      <Skeleton width='100%' height={32} />
    </View>
  );
}
