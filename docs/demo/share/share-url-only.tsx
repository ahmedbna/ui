import { ShareButton } from '@/components/ui/share';
import { View } from '@/components/ui/view';
import React from 'react';

export function ShareUrlOnly() {
  return (
    <View style={{ gap: 12 }}>
      <ShareButton content={{ url: 'https://github.com' }} variant='outline'>
        Share GitHub
      </ShareButton>

      <ShareButton
        content={{ url: 'https://reactnative.dev' }}
        variant='secondary'
      >
        Share React Native Docs
      </ShareButton>

      <ShareButton content={{ url: 'https://expo.dev' }} variant='ghost'>
        Share Expo
      </ShareButton>
    </View>
  );
}
