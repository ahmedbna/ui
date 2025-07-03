import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { View } from '@/components/ui/view';
import React from 'react';

export function AvatarStatus() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      <View style={{ position: 'relative' }}>
        <Avatar size={56}>
          <AvatarImage
            source={{
              uri: 'https://avatars.githubusercontent.com/u/99088394?v=4',
            }}
          />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: '#10b981',
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
      </View>

      <View style={{ position: 'relative' }}>
        <Avatar size={56}>
          <AvatarFallback>BNA</AvatarFallback>
        </Avatar>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: '#ef4444',
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
      </View>

      <View style={{ position: 'relative' }}>
        <Avatar size={56}>
          <AvatarImage
            source={{
              uri: 'https://avatars.githubusercontent.com/u/12504344?s=200&v=4',
            }}
          />
          <AvatarFallback>EX</AvatarFallback>
        </Avatar>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: '#f59e0b',
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
      </View>
    </View>
  );
}
