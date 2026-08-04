import { useColor } from '@/hooks/useColor';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function OnboardingLayout() {
  const background = useColor('background');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: background },
        // No swipe back out of onboarding — the only way forward is through,
        // and the route guard would bounce them here again anyway.
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='profile' />
    </Stack>
  );
}
