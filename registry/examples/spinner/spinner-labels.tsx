import { Spinner } from '@/components/ui/spinner';
import { View } from '@/components/ui/view';
import React from 'react';

export function SpinnerLabels() {
  return (
    <View style={{ gap: 24 }}>
      <Spinner size='default' variant='default' showLabel />
      <Spinner size='default' variant='dots' label='Processing...' />
      <Spinner size='default' variant='pulse' label='Uploading files...' />
      <Spinner size='lg' variant='cirlce' label='Please wait' />
    </View>
  );
}
