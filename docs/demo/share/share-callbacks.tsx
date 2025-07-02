import { ShareButton } from '@/components/ui/share';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ShareCallbacks() {
  const [status, setStatus] = useState<string>('Ready to share');
  const [isLoading, setIsLoading] = useState(false);

  const handleShareStart = () => {
    setStatus('Starting share...');
    setIsLoading(true);
  };

  const handleShareSuccess = (activityType?: string | null) => {
    setStatus(
      `Shared successfully${activityType ? ` via ${activityType}` : ''}!`
    );
    setIsLoading(false);

    // Reset status after 3 seconds
    setTimeout(() => setStatus('Ready to share'), 3000);
  };

  const handleShareError = (error: Error) => {
    setStatus(`Share failed: ${error.message}`);
    setIsLoading(false);

    // Reset status after 3 seconds
    setTimeout(() => setStatus('Ready to share'), 3000);
  };

  const handleShareDismiss = () => {
    setStatus('Share cancelled');
    setIsLoading(false);

    // Reset status after 2 seconds
    setTimeout(() => setStatus('Ready to share'), 2000);
  };

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: '500' }}>Status: {status}</Text>

      <ShareButton
        content={{
          message: 'Check out this awesome React Native component library!',
          url: 'https://github.com/example/ui-library',
          title: 'UI Component Library',
        }}
        loading={isLoading}
        onShareStart={handleShareStart}
        onShareSuccess={handleShareSuccess}
        onShareError={handleShareError}
        onShareDismiss={handleShareDismiss}
      >
        Share with Callbacks
      </ShareButton>
    </View>
  );
}
