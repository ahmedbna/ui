import { ShareButton } from '@/components/ui/share';
import { View } from '@/components/ui/view';
import React from 'react';

export function ShareSizes() {
  const shareContent = {
    message: 'Check out this amazing content!',
    url: 'https://example.com',
  };

  return (
    <View style={{ gap: 12, alignItems: 'center' }}>
      <ShareButton content={shareContent} size='sm'>
        Small
      </ShareButton>

      <ShareButton content={shareContent} size='default'>
        Default
      </ShareButton>

      <ShareButton content={shareContent} size='lg'>
        Large
      </ShareButton>

      <ShareButton content={shareContent} size='icon' iconSize={20} />
    </View>
  );
}
