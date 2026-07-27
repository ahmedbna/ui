import React from 'react';
import { Icon } from '@/components/ui/icon';
import { useColor } from '@/hooks/useColor';
import { Tabs } from 'expo-router';
import { Home, Search, Settings } from 'lucide-react-native';

export default function WebTabsLayout() {
  const primary = useColor('primary');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primary,
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
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon name={Settings} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon name={Search} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
