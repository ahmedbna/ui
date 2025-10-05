import React from 'react';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Home, Stars, UserCircle2 } from 'lucide-react-native';
import { Platform, StyleSheet } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { useColor } from '@/hooks/useColor';
import { Icon } from '@/components/ui/icon';
import { View } from '@/components/ui/view';
import { Auth } from '@/components/auth/auth';
import { Spinner } from '@/components/ui/spinner';
import * as Haptics from 'expo-haptics';

export default function TabLayout() {
  const primary = useColor('primary');

  return (
    <View style={{ flex: 1 }}>
      <AuthLoading>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Spinner size='lg' variant='circle' color='#F8D534' />
        </View>
      </AuthLoading>
      <Unauthenticated>
        <Auth />
      </Unauthenticated>
      <Authenticated>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: primary,
            headerShown: false,
            tabBarButton: (props) => (
              <PlatformPressable
                {...props}
                onPressIn={(ev) => {
                  if (process.env.EXPO_OS === 'ios') {
                    // Add a soft haptic feedback when pressing down on the tabs.
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  props.onPressIn?.(ev);
                }}
              />
            ),
            tabBarBackground: () => {
              if (Platform.OS === 'ios') {
                return (
                  <BlurView
                    tint='systemChromeMaterial'
                    intensity={100}
                    style={StyleSheet.absoluteFill}
                  />
                );
              }

              // On Android & Web: no background
              return null;
            },
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: 'absolute',
              },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <Icon name={Home} size={24} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name='explore'
            options={{
              title: 'Explore',
              tabBarIcon: ({ color }) => (
                <Icon name={Stars} size={24} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name='profile'
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <Icon name={UserCircle2} size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </Authenticated>
    </View>
  );
}
