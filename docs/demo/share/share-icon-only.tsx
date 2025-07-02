import { ShareButton } from '@/components/ui/share';
import { View } from '@/components/ui/view';
import React from 'react';

export function ShareIconOnly() {
  const shareContent = {
    message: 'Check out this amazing content!',
    url: 'https://example.com',
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <ShareButton
        content={shareContent}
        size='icon'
        variant='default'
        iconSize={18}
      />

      <ShareButton
        content={shareContent}
        size='icon'
        variant='secondary'
        iconSize={18}
      />

      <ShareButton
        content={shareContent}
        size='icon'
        variant='outline'
        iconSize={18}
      />

      <ShareButton
        content={shareContent}
        size='icon'
        variant='ghost'
        iconSize={20}
      />
    </View>
  );
}
