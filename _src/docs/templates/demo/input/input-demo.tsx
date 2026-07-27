import { Input } from '@/components/ui/input';
import { User } from 'lucide-react-native';
import React from 'react';

export function InputDemo() {
  return (
    <Input label='Username' placeholder='Enter your username' icon={User} />
  );
}
