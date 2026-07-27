// Example usage of Loading Spinner components
import { Spinner } from '@/components/ui/spinner';
import { View } from '@/components/ui/view';
import { Colors } from '@/theme/colors';
import { Home, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '@/components/ui/button';

export function SpinnerDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ gap: 24 }}>
          <Spinner />

          <Spinner variant='dots' size='lg' />
          <Spinner variant='pulse' color='#FF6B6B' />
          <Spinner variant='bars' />

          <Spinner variant='circle' color={Colors.light.blue} speed='fast' />

          <Button loading loadingVariant='default'>
            Save
          </Button>

          <Button loading loadingVariant='dots'>
            Upload
          </Button>

          <Button loading loadingVariant='pulse' variant='destructive'>
            Delete
          </Button>

          <Button icon={Trash2} variant='destructive'>
            Delete
          </Button>

          <Button loading loadingVariant='circle' variant='success'>
            Done
          </Button>

          <Button icon={Home} variant='success' animation={false}>
            Done
          </Button>

          {/* <LoadingOverlay
            visible={loading}
            variant='dots'
            label='Loading...'
            showLabel
          /> */}
        </View>
      </ScrollView>
    </View>
  );
}
