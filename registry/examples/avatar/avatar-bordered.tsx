import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { View } from '@/components/ui/view';
import React from 'react';

export function AvatarBordered() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      <Avatar
        size={64}
        style={{
          borderWidth: 4,
          borderColor: '#3b82f6',
          shadowColor: '#3b82f6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
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
        size={64}
        style={{
          borderWidth: 4,
          borderColor: '#10b981',
          shadowColor: '#10b981',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <AvatarFallback>BNA</AvatarFallback>
      </Avatar>

      <Avatar
        size={64}
        style={{
          borderWidth: 4,
          borderColor: '#f59e0b',
          shadowColor: '#f59e0b',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <AvatarImage
          source={{
            uri: 'https://avatars.githubusercontent.com/u/12504344?s=200&v=4',
          }}
        />
        <AvatarFallback>EX</AvatarFallback>
      </Avatar>
    </View>
  );
}
