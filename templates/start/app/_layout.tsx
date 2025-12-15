import { useColorScheme } from '@/hooks/useColorScheme';
import { AppTheme } from '@/constants/theme';
import { ThemeProvider } from '@/theme/theme-provider';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { osName } from 'expo-device';
import { isLiquidGlassAvailable } from 'expo-glass-effect'; // Assuming this package is still used/available (checked package.json earlier)
import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { setBackgroundColorAsync } from 'expo-system-ui';
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme() || 'light';
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  // Handle navigation bar styling for Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync(
        colorScheme === 'light' ? 'dark' : 'light'
      );
    }
  }, [colorScheme]);

  // Handle system UI background color
  useEffect(() => {
    setBackgroundColorAsync(
      colorScheme === 'dark' ? AppTheme.dark.background : AppTheme.light.background
    );
  }, [colorScheme]);

  // Hide splash screen when ready
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // Auth Protection Logic
  useEffect(() => {
    if (isLoading) return;
    // Wait for navigation to be fully ready
    if (!rootNavigationState?.key) return;
    if (!rootNavigationState?.routes) return;

    const inOnboarding = segments[0] === 'onboarding';

    // Use setTimeout to ensure Stack is fully mounted
    const timeoutId = setTimeout(() => {
      if (isAuthenticated && inOnboarding) {
        // Redirect to home if authenticated and trying to access onboarding
        router.replace('/(tabs)/(home)');
      } else if (!isAuthenticated && !inOnboarding) {
        // Redirect to onboarding if not authenticated and trying to access protected routes
        router.replace('/onboarding');
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, segments, isLoading, rootNavigationState]);

  if (isLoading) {
    return <View />; // Or a Splash component
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} animated />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='onboarding' options={{ headerShown: false }} />
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

          <Stack.Screen
            name='sheet'
            options={{
              headerShown: false,
              sheetGrabberVisible: true,
              sheetAllowedDetents: [0.4, 0.7, 1],
              contentStyle: {
                backgroundColor: isLiquidGlassAvailable()
                  ? 'transparent'
                  : colorScheme === 'dark'
                  ? AppTheme.dark.card
                  : AppTheme.light.card,
              },
              headerTransparent: Platform.OS === 'ios' ? true : false,
              headerLargeTitle: false,
              title: '',
              presentation:
                Platform.OS === 'ios'
                  ? isLiquidGlassAvailable() && osName !== 'iPadOS'
                    ? 'formSheet'
                    : 'modal'
                  : 'modal',
              sheetInitialDetentIndex: 0,
              headerStyle: {
                backgroundColor:
                  Platform.OS === 'ios'
                    ? 'transparent'
                    : colorScheme === 'dark'
                    ? AppTheme.dark.card
                    : AppTheme.light.card,
              },
              headerBlurEffect: isLiquidGlassAvailable()
                ? undefined
                : colorScheme === 'dark'
                ? 'dark'
                : 'light',
            }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
