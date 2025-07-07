import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { View } from '@/components/ui/view';
import React from 'react';

export function AvatarStyled() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Avatar
        size={56}
        style={{
          borderWidth: 3,
          borderColor: '#3b82f6',
        }}
      >
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
          }}
        />
        <AvatarFallback
          style={{ backgroundColor: '#3b82f6' }}
          textStyle={{ color: 'white', fontWeight: 'bold' }}
        >
          AB
        </AvatarFallback>
      </Avatar>

      <Avatar
        size={56}
        style={{
          borderWidth: 3,
          borderColor: '#10b981',
        }}
      >
        <AvatarFallback
          style={{ backgroundColor: '#10b981' }}
          textStyle={{ color: 'white', fontWeight: 'bold' }}
        >
          BNA
        </AvatarFallback>
      </Avatar>

      <Avatar
        size={56}
        style={{
          borderWidth: 3,
          borderColor: '#f59e0b',
        }}
      >
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/12504344?s=200&v=4',
          }}
        />
        <AvatarFallback
          style={{ backgroundColor: '#f59e0b' }}
          textStyle={{ color: 'white', fontWeight: 'bold' }}
        >
          EX
        </AvatarFallback>
      </Avatar>
    </View>
  );
}
