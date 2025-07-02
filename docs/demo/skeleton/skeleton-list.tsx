import { Skeleton } from '@/components/ui/skeleton';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';

export function SkeletonList() {
  const card = useThemeColor({}, 'card');

  return (
    <View
      style={{
        gap: 16,
        padding: 16,
        borderRadius: BORDER_RADIUS,
        backgroundColor: card,
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <View
          key={i}
          style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}
        >
          <Skeleton width={50} height={50} style={{ borderRadius: 25 }} />
          <View style={{ flex: 1, gap: 6 }}>
            <Skeleton width='70%' height={16} />
            <Skeleton width='50%' height={14} />
            <Skeleton width='30%' height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}
