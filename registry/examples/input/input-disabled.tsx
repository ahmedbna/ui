import { Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';
import { Mail, User } from 'lucide-react-native';
import React from 'react';

export function InputDisabled() {
  return (
    <View style={{ gap: 16 }}>
      <Input
        label='Username'
        placeholder='This input is disabled'
        icon={User}
        disabled
      />
      <Input label='Email' value='john@example.com' icon={Mail} disabled />
    </View>
  );
}
