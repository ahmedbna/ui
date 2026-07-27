// Example usage of the Share component
import { ShareButton } from '@/components/ui/share';
import { View } from '@/components/ui/view';
import React from 'react';
import { ScrollView } from 'react-native';

export function ShareExamples() {
  const handleShareSuccess = (activityType?: string | null) => {
    console.log('Share successful', { activityType });
  };

  const handleShareError = (error: Error) => {
    console.error('Share failed', error);
  };

  const handleShareDismiss = () => {
    console.log('Share dismissed');
  };

  const handleShareStart = () => {
    console.log('Share dismissed');
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* Icon Only Buttons */}
      <View style={{ gap: 24 }}>
        {/* // Basic usage */}
        <ShareButton
          content={{ message: 'Check this out!', url: 'https://example.com' }}
        >
          Share
        </ShareButton>

        {/* // With all options */}
        <ShareButton
          content={{
            message: 'Amazing app!',
            url: 'https://myapp.com',
            title: 'My App',
            subject: 'Check out this app',
          }}
          options={{
            dialogTitle: 'Share via',
            excludedActivityTypes: ['com.apple.UIKit.activity.Mail'],
            tintColor: '#000000',
          }}
          onShareSuccess={(activityType) =>
            console.log('Shared via:', activityType)
          }
          onShareError={(error) => console.error('Share failed:', error)}
          loading={false}
          testID='share-button'
        >
          Share Now
        </ShareButton>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ShareButton
            content={{
              title: 'Custom Share',
              message: 'This is a custom message with specific content',
              url: 'https://example.com',
              subject: 'Check this out!', // iOS email subject
            }}
            size='icon'
            onShareDismiss={handleShareDismiss}
          />

          <ShareButton
            content={{
              title: 'Custom Share',
              message: 'This is a custom message with specific content',
              url: 'https://example.com',
              subject: 'Check this out!', // iOS email subject
            }}
            variant='outline'
            size='icon'
            onShareError={handleShareError}
          />

          <ShareButton
            content={{
              title: 'Custom Share',
              message: 'This is a custom message with specific content',
              url: 'https://example.com',
              subject: 'Check this out!', // iOS email subject
            }}
            variant='ghost'
            size='icon'
            onShareSuccess={handleShareSuccess}
          />
        </View>
      </View>
    </ScrollView>
  );
}
