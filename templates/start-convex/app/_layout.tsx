import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ConvexReactClient } from 'convex/react';
import * as SecureStore from 'expo-secure-store';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme/theme-provider';
import 'react-native-reanimated';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ConvexAuthProvider
          client={convex}
          storage={
            Platform.OS === 'android' || Platform.OS === 'ios'
              ? secureStorage
              : undefined
          }
        >
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </ConvexAuthProvider>

        <StatusBar style='auto' />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
