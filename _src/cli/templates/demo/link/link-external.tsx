import { Link } from '@/components/ui/link';
import { View } from '@/components/ui/view';
import React from 'react';

export function LinkExternal() {
  return (
    <View style={{ gap: 12 }}>
      <Link href='https://github.com'>Visit GitHub</Link>
      <Link href='https://expo.dev'>Expo Documentation</Link>
      <Link href='https://reactnative.dev'>React Native Docs</Link>
    </View>
  );
}
