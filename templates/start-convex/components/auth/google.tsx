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

export const SignInWithGoogle = () => {
  const { signIn } = useAuthActions();
  const secondary = useColor('secondary');

  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    const { redirect } = await signIn('google', {
      redirectTo,
    });

    if (Platform.OS === 'web') {
      return;
    }

    const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);

    if (result.type === 'success') {
      const { url } = result;

      const code = new URL(url).searchParams.get('code')!;

      await signIn('google', { code });
    } else {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} onPress={handleGoogleSignIn}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Ionicons name='logo-google' size={20} color={secondary} />
        <Text style={{ color: secondary, fontWeight: 500 }}>
          Login with Google
        </Text>
      </View>
    </Button>
  );
};
