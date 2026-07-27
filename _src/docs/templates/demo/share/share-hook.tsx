import { Button } from '@/components/ui/button';
import { useShare } from '@/components/ui/share';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ShareHook() {
  const { shareText, shareUrl, shareContent } = useShare();
  const [status, setStatus] = useState<string>('Choose a sharing method');

  const handleShareText = async () => {
    try {
      setStatus('Sharing text...');
      await shareText(
        'Hello from the useShare hook! This is just a plain text message.'
      );
      setStatus('Text shared successfully!');
    } catch (error) {
      setStatus(`Failed to share text: ${(error as Error).message}`);
    }
  };

  const handleShareUrl = async () => {
    try {
      setStatus('Sharing URL...');
      await shareUrl(
        'https://reactnative.dev',
        'Check out the official React Native documentation!'
      );
      setStatus('URL shared successfully!');
    } catch (error) {
      setStatus(`Failed to share URL: ${(error as Error).message}`);
    }
  };

  const handleShareContent = async () => {
    try {
      setStatus('Sharing content...');
      await shareContent({
        message:
          '🚀 Just built an amazing React Native app with this component library!',
        url: 'https://github.com/example/ui-library',
        title: 'Amazing UI Library',
        subject: 'Check out this UI library',
      });
      setStatus('Content shared successfully!');
    } catch (error) {
      setStatus(`Failed to share content: ${(error as Error).message}`);
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: '500', textAlign: 'center' }}>{status}</Text>

      <View style={{ gap: 8 }}>
        <Button onPress={handleShareText} variant='outline'>
          Share Text Only
        </Button>

        <Button onPress={handleShareUrl} variant='secondary'>
          Share URL with Message
        </Button>

        <Button onPress={handleShareContent} variant='default'>
          Share Rich Content
        </Button>
      </View>
    </View>
  );
}
