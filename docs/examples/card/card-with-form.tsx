import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

export function CardWithForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ marginBottom: 8, fontWeight: '500' }}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder='Enter your email'
              style={{
                borderWidth: 1,
                borderColor,
                borderRadius: 999,
                padding: 12,
                backgroundColor,
                color: textColor,
              }}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>
          <View>
            <Text style={{ marginBottom: 8, fontWeight: '500' }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder='Enter your password'
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor,
                borderRadius: 999,
                padding: 12,
                backgroundColor,
                color: textColor,
              }}
            />
          </View>
        </View>
      </CardContent>
      <CardFooter>
        <Button variant='outline'>Cancel</Button>
        <Button>Sign In</Button>
      </CardFooter>
    </Card>
  );
}
