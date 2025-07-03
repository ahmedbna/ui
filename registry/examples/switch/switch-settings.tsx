import { Switch } from '@/components/ui/switch';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React, { useState } from 'react';

export function SwitchSettings() {
  const card = useThemeColor({}, 'card');

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <View
      style={{
        backgroundColor: card,
        borderRadius: BORDER_RADIUS,
        padding: 16,
        gap: 16,
      }}
    >
      <Switch
        label='Push notifications'
        value={notifications}
        onValueChange={setNotifications}
      />
      <Switch label='Dark mode' value={darkMode} onValueChange={setDarkMode} />
      <Switch
        label='Location services'
        value={location}
        onValueChange={setLocation}
      />
      <Switch
        label='Analytics & performance'
        value={analytics}
        onValueChange={setAnalytics}
      />
    </View>
  );
}
