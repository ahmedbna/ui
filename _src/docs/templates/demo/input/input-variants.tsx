import { Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';
import { Mail, User } from 'lucide-react-native';
import React from 'react';

export function InputVariants() {
  return (
    <View style={{ gap: 16 }}>
      <Input
        variant='filled'
        label='Username'
        placeholder='Filled variant'
        icon={User}
      />
      <Input
        variant='outline'
        label='Email'
        placeholder='Outline variant'
        icon={Mail}
      />
    </View>
  );
}
