import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function SkeletonShapes() {
  const card = useThemeColor({}, 'card');

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        padding: 16,
        borderRadius: BORDER_RADIUS,
        backgroundColor: card,
      }}
    >
      {/* Circle */}
      <Skeleton width={60} height={60} style={{ borderRadius: 30 }} />

      {/* Square */}
      <Skeleton width={60} height={60} style={{ borderRadius: 4 }} />

      {/* Rounded Rectangle */}
      <Skeleton width={120} height={60} style={{ borderRadius: 12 }} />

      {/* Pill */}
      <Skeleton width={100} height={30} style={{ borderRadius: 15 }} />

      {/* Custom styled */}
      <Skeleton
        width={80}
        height={80}
        style={{
          borderRadius: 20,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}
