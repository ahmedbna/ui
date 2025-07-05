import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { View } from '@/components/ui/view';
import React from 'react';

export function AvatarSizes() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Avatar size={24}>
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
          }}
        />
        <AvatarFallback textStyle={{ fontSize: 10 }}>AB</AvatarFallback>
      </Avatar>

      <Avatar size={32}>
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
          }}
        />
        <AvatarFallback textStyle={{ fontSize: 12 }}>AB</AvatarFallback>
      </Avatar>

      <Avatar size={40}>
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
          }}
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>

      <Avatar size={56}>
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
          }}
        />
        <AvatarFallback textStyle={{ fontSize: 18 }}>AB</AvatarFallback>
      </Avatar>

      <Avatar size={72}>
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
          }}
        />
        <AvatarFallback textStyle={{ fontSize: 24 }}>AB</AvatarFallback>
      </Avatar>
    </View>
  );
}
