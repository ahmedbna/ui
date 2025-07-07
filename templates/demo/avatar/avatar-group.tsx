import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { View } from '@/components/ui/view';
import React from 'react';

export function AvatarGroup() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Avatar
        size={48}
        style={{
          borderWidth: 2,
          borderColor: 'white',
          zIndex: 4,
        }}
      >
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar
        size={48}
        style={{
          borderWidth: 2,
          borderColor: 'white',
          marginLeft: -12,
          zIndex: 3,
        }}
      >
        <AvatarImage
          source={{
            uri: 'https://reactnative.dev/img/header_logo.svg',
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar
        size={48}
        style={{
          borderWidth: 2,
          borderColor: 'white',
          marginLeft: -12,
          zIndex: 2,
        }}
      >
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/12504344?s=200&v=4',
          }}
        />
        <AvatarFallback>EX</AvatarFallback>
      </Avatar>

      <Avatar
        size={48}
        style={{
          borderWidth: 2,
          borderColor: 'white',
          marginLeft: -12,
          zIndex: 1,
        }}
      >
        <AvatarFallback
          style={{ backgroundColor: '#6b7280' }}
          textStyle={{ color: 'white', fontSize: 12 }}
        >
          +5
        </AvatarFallback>
      </Avatar>
    </View>
  );
}
