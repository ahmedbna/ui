import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { View } from '@/components/ui/view';
import React from 'react';

export function AvatarFallbackDemo() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarFallback>SL</AvatarFallback>
      </Avatar>
    </View>
  );
}
