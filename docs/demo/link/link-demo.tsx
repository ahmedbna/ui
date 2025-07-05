import { Link } from '@/components/ui/link';
import { View } from '@/components/ui/view';
import React from 'react';

export function LinkDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Link href='/'>Go to Profile</Link>
      <Link href='/'>Settings</Link>
      <Link href={{ pathname: '/', params: { id: '123' } }}>User Details</Link>
    </View>
  );
}
