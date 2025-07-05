import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function BottomSheetForm() {
  const { isVisible, open, close } = useBottomSheet();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', { name, email });
    close();
  };

  return (
    <View>
      <Button onPress={open}>Edit Profile</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title='Edit Profile'
        snapPoints={[0.6, 0.8]}
        enableBackdropDismiss={false}
      >
        <View style={{ gap: 20 }}>
          <View style={{ gap: 12 }}>
            <Text variant='body'>Name</Text>
            <Input
              value={name}
              onChangeText={setName}
              variant='outline'
              placeholder='Enter your name'
            />
          </View>

          <View style={{ gap: 12 }}>
            <Text variant='body'>Email</Text>
            <Input
              value={email}
              onChangeText={setEmail}
              variant='outline'
              placeholder='Enter your email'
              keyboardType='email-address'
            />
          </View>

          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              gap: 12,
              marginTop: 12,
            }}
          >
            <Button variant='outline' onPress={close} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button onPress={handleSubmit} style={{ flex: 2 }}>
              Save
            </Button>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
