import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        source={{ uri: 'https://avatars.githubusercontent.com/u/99088394?v=4' }}
      />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  );
}
