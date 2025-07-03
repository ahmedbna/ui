import { Button } from '@/components/ui/button';
import { LoadingOverlay } from '@/components/ui/spinner';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function SpinnerOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleShowOverlay = () => {
    setShowOverlay(true);
    // Auto hide after 3 seconds for demo
    setTimeout(() => setShowOverlay(false), 3000);
  };

  return (
    <View style={{ gap: 16 }}>
      <Button onPress={handleShowOverlay} disabled={showOverlay}>
        Show Loading Overlay
      </Button>

      <LoadingOverlay
        visible={showOverlay}
        size='lg'
        variant='cirlce'
        label='Loading content...'
        backdrop={true}
        backdropOpacity={0.7}
      />
    </View>
  );
}
