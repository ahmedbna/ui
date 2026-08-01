import { useColor } from '@/hooks/useColor';
import { Stack } from 'expo-router';

/**
 * Without this the group opens on whichever route sorts first —
 * `forgot-password` — because there is no `index.tsx` here. Every screen is a
 * named route on purpose, so that the password-recovery email can deep-link
 * straight to `/reset-password`.
 */
export const unstable_settings = {
  initialRouteName: 'sign-in',
};

export default function AuthLayout() {
  const text = useColor('text');
  const background = useColor('background');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: text,
        contentStyle: { backgroundColor: background },
        // Each screen is a real route, so `/sign-up` and `/reset-password` can
        // be linked to directly — which the password-recovery email does.
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name='sign-in' />
      <Stack.Screen name='sign-up' />
      <Stack.Screen name='magic-link' />
      <Stack.Screen name='verify-otp' />
      <Stack.Screen name='forgot-password' />
      <Stack.Screen name='reset-password' />
    </Stack>
  );
}
