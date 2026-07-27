import { ShareButton } from '@/components/ui/share';
import { View } from '@/components/ui/view';
import React from 'react';

export function ShareVariants() {
  const shareContent = {
    message: 'Check out this amazing content!',
    url: 'https://example.com',
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      <ShareButton content={shareContent} variant='default'>
        Default
      </ShareButton>

      <ShareButton content={shareContent} variant='secondary'>
        Secondary
      </ShareButton>

      <ShareButton content={shareContent} variant='outline'>
        Outline
      </ShareButton>

      <ShareButton content={shareContent} variant='ghost'>
        Ghost
      </ShareButton>

      <ShareButton content={shareContent} variant='link'>
        Link
      </ShareButton>

      <ShareButton content={shareContent} variant='destructive'>
        Destructive
      </ShareButton>
    </View>
  );
}
