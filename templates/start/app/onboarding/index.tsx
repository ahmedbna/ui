import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';

export default function OnboardingScreen() {
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    signIn();
    // Router redirect handled in _layout
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Text type="title">Welcome to BNA UI</Text>
      <Text type="body">Please sign in to continue</Text>
      <Button onPress={handleLogin}>Sign In</Button>
    </View>
  );
}
