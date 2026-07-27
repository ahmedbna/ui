import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export function RadioForm() {
  const [experience, setExperience] = useState('');
  const [notification, setNotification] = useState('email');
  const [theme, setTheme] = useState('system');

  const handleSubmit = () => {
    if (!experience) {
      Alert.alert('Error', 'Please select your experience level');
      return;
    }

    Alert.alert(
      'Form Submitted',
      `Experience: ${experience}\nNotifications: ${notification}\nTheme: ${theme}`
    );
  };

  return (
    <View style={{ paddingVertical: 16, gap: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>User Preferences</Text>

      <View>
        <Text style={{ marginBottom: 12, fontWeight: '500', fontSize: 16 }}>
          Experience Level *
        </Text>
        <RadioGroup
          options={[
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
            { label: 'Expert', value: 'expert' },
          ]}
          value={experience}
          onValueChange={setExperience}
        />
      </View>

      <View>
        <Text style={{ marginBottom: 12, fontWeight: '500', fontSize: 16 }}>
          Notification Preference
        </Text>
        <RadioGroup
          options={[
            { label: 'Email notifications', value: 'email' },
            { label: 'Push notifications', value: 'push' },
            { label: 'SMS notifications', value: 'sms' },
            { label: 'No notifications', value: 'none' },
          ]}
          value={notification}
          onValueChange={setNotification}
        />
      </View>

      <View>
        <Text style={{ marginBottom: 12, fontWeight: '500', fontSize: 16 }}>
          Theme Preference
        </Text>
        <RadioGroup
          orientation='horizontal'
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ]}
          value={theme}
          onValueChange={setTheme}
        />
      </View>

      <Button onPress={handleSubmit} style={{ marginTop: 8 }}>
        Save Preferences
      </Button>
    </View>
  );
}
