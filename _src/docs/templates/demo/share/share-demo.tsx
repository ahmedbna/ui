import { ShareButton } from '@/components/ui/share';
import React from 'react';

export function ShareDemo() {
  return (
    <ShareButton
      content={{
        message: 'Check out this amazing app!',
        url: 'https://example.com',
        title: 'Amazing App',
      }}
      onShareSuccess={(activityType) => {
        console.log('Shared successfully:', activityType);
      }}
      onShareError={(error) => {
        console.error('Share failed:', error);
      }}
    >
      Share
    </ShareButton>
  );
}
