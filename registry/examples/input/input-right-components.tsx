import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Copy, Eye, EyeOff, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';

export function InputRightComponents() {
  const muted = useThemeColor({}, 'mutedForeground');

  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={{ gap: 16 }}>
      <Input
        label='Search'
        placeholder='Search with button...'
        icon={Search}
        rightComponent={
          <Button size='icon' variant='secondary'>
            <Text variant='caption'>Go</Text>
          </Button>
        }
      />

      <Input
        label='Password'
        placeholder='Toggle visibility'
        secureTextEntry={!showPassword}
        rightComponent={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={22} color={muted} />
            ) : (
              <Eye size={22} color={muted} />
            )}
          </Pressable>
        }
      />

      <Input
        label='API Key'
        placeholder='sk-1234567890abcdef'
        rightComponent={
          <Pressable onPress={handleCopy}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Copy size={18} color={muted} />
              <Text variant='caption'>{copied ? 'Copied!' : 'Copy'}</Text>
            </View>
          </Pressable>
        }
      />
    </View>
  );
}
