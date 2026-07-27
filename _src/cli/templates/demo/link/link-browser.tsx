import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

export function LinkBrowser() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          In-App Browser (Default)
        </Text>
        <View style={{ gap: 6 }}>
          <Link href='https://github.com' browser='in-app'>
            Open GitHub in-app
          </Link>
          <Link href='https://expo.dev'>Open Expo docs in-app</Link>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontWeight: '600', fontSize: 16 }}>
          External Browser
        </Text>
        <View style={{ gap: 6 }}>
          <Link href='https://github.com' browser='external'>
            Open GitHub externally
          </Link>
          <Link href='https://expo.dev' browser='external'>
            Open Expo docs externally
          </Link>
        </View>
      </View>
    </View>
  );
}
