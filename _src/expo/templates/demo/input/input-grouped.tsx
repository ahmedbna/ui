import { GroupedInput, GroupedInputItem } from '@/components/ui/input';
import { Mail, MapPin, Phone, User } from 'lucide-react-native';
import React from 'react';

export function InputGrouped() {
  return (
    <GroupedInput title='Personal Information'>
      <GroupedInputItem label='Name' placeholder='John Doe' icon={User} />
      <GroupedInputItem
        label='Email'
        placeholder='john@example.com'
        icon={Mail}
        keyboardType='email-address'
      />
      <GroupedInputItem
        label='Phone'
        placeholder='+1 (555) 123-4567'
        icon={Phone}
        keyboardType='phone-pad'
      />
      <GroupedInputItem
        label='Address'
        placeholder='123 Main St'
        icon={MapPin}
      />
    </GroupedInput>
  );
}
