import { Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';
import { Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';

export function InputValidation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailError =
    email && !email.includes('@') ? 'Please enter a valid email address' : '';
  const passwordError =
    password && password.length < 6
      ? 'Password must be at least 6 characters'
      : '';

  return (
    <View style={{ gap: 16 }}>
      <Input
        label='Email'
        placeholder='Enter your email'
        icon={Mail}
        value={email}
        onChangeText={setEmail}
        error={emailError}
        keyboardType='email-address'
      />
      <Input
        label='Password'
        placeholder='Enter password'
        icon={Lock}
        value={password}
        onChangeText={setPassword}
        error={passwordError}
        secureTextEntry
      />
    </View>
  );
}
