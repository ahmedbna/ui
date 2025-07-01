// registry/examples/input/input-right-components.tsx
import { Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Search, Eye, EyeOff, Copy } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

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
