import { Icon } from '@/components/ui/icon';
import { useColor } from '@/hooks/useColor';
import { PlatformPressable } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import {
  ChartCandlestick,
  HeartHandshakeIcon,
  Home,
  LucideSquareDashedMousePointer,
  MapPlus,
} from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default function TabLayout() {
  const primary = useColor('primary');

  return (
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
        name='maps'
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => (
            <Icon name={MapPlus} size={24} color={color} />
          ),
          tabBarStyle: { display: 'none' }, // This line hides the tab bar for the 'maps' screen
        }}
      />

      <Tabs.Screen
        name='welcome'
        options={{
          title: 'Welcome',
          tabBarIcon: ({ color }) => (
            <Icon name={HeartHandshakeIcon} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='demo'
        options={{
          title: 'Demo',
          tabBarIcon: ({ color }) => (
            <Icon
              name={LucideSquareDashedMousePointer}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='charts'
        options={{
          title: 'Charts',
          tabBarIcon: ({ color }) => (
            <Icon name={ChartCandlestick} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
