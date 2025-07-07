import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible } from '@/components/ui/collapsible';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function CollapsibleWithContent() {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    analytics: false,
  });

  return (
    <View style={{ gap: 16 }}>
      <Collapsible title='App Settings'>
        <View style={{ gap: 12 }}>
          <Checkbox
            checked={preferences.darkMode}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, darkMode: checked }))
            }
            label='Enable dark mode'
          />

          <Checkbox
            checked={preferences.notifications}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, notifications: checked }))
            }
            label='Push notifications'
          />

          <Checkbox
            checked={preferences.analytics}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, analytics: checked }))
            }
            label='Analytics tracking'
          />
        </View>
      </Collapsible>

      <Collapsible title='Account Information'>
        <View style={{ gap: 8 }}>
          <Text variant='body'>Email: user@example.com</Text>
          <Text variant='body'>Member since: January 2024</Text>
          <Text variant='body'>Subscription: Premium</Text>
        </View>
      </Collapsible>
    </View>
  );
}
