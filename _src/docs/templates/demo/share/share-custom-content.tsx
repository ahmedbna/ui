import { ShareButton } from '@/components/ui/share';
import { View } from '@/components/ui/view';
import React from 'react';

export function ShareCustomContent() {
  return (
    <View style={{ gap: 12 }}>
      {/* Rich content with title and subject */}
      <ShareButton
        content={{
          message:
            'I found this amazing article about React Native development. You should definitely check it out!',
          url: 'https://reactnative.dev/blog',
          title: 'React Native Blog',
          subject: 'Great React Native Article',
        }}
        options={{
          dialogTitle: 'Share this article',
        }}
      >
        Share Article
      </ShareButton>

      {/* App promotion */}
      <ShareButton
        content={{
          message:
            '🚀 Just discovered this incredible mobile app! The UI is amazing and it works perfectly on both iOS and Android. Download it now!',
          url: 'https://apps.apple.com/app/example',
          title: 'Amazing Mobile App',
          subject: 'You need to try this app!',
        }}
        variant='secondary'
      >
        Share App
      </ShareButton>

      {/* Event invitation */}
      <ShareButton
        content={{
          message:
            "🎉 You're invited to our tech meetup! Join us for an evening of networking, learning, and great discussions about mobile development.",
          url: 'https://meetup.com/event/123',
          title: 'Tech Meetup Invitation',
          subject: 'Join us at the Tech Meetup!',
        }}
        variant='outline'
      >
        Share Event
      </ShareButton>
    </View>
  );
}
