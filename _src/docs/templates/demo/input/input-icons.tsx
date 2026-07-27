import { Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';
import { Lock, Mail, Phone, Search } from 'lucide-react-native';
import React from 'react';

export function InputIcons() {
  return (
    <View style={{ gap: 16 }}>
      <Input
        label='Email'
        placeholder='john@example.com'
        icon={Mail}
        keyboardType='email-address'
      />
      <Input
        label='Password'
        placeholder='Enter password'
        icon={Lock}
        secureTextEntry
      />
      <Input label='Search' placeholder='Search anything...' icon={Search} />
      <Input
        label='Phone'
        placeholder='+1 (555) 123-4567'
        icon={Phone}
        keyboardType='phone-pad'
      />
    </View>
  );
}
