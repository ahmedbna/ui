import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { makeRedirectUri } from 'expo-auth-session';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useColor } from '@/hooks/useColor';

const redirectTo = makeRedirectUri();

export const SignInWithApple = () => {
  const { signIn } = useAuthActions();
  const secondary = useColor('secondary');

  const [loading, setLoading] = useState(false);

  const handleAppleSignIn = async () => {
    setLoading(true);

    const { redirect } = await signIn('apple', {
      redirectTo,
    });

    if (Platform.OS === 'web') {
      return;
    }

    const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);

    if (result.type === 'success') {
      const { url } = result;

      const code = new URL(url).searchParams.get('code')!;

      await signIn('apple', { code });
    } else {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} onPress={handleAppleSignIn}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Ionicons name='logo-apple' size={22} color={secondary} />
        <Text style={{ color: secondary, fontWeight: 500 }}>
          Login with Apple
        </Text>
      </View>
    </Button>
  );
};
