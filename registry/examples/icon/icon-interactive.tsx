import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { View } from '@/components/ui/view';
import { Bookmark, Heart, Share, ThumbsUp } from 'lucide-react-native';
import React, { useState } from 'react';

export function IconInteractive() {
  const [liked, setLiked] = useState(false);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const iconButtons = [
    {
      icon: Heart,
      active: liked,
      onPress: () => setLiked(!liked),
      activeColor: '#FF6B6B',
      inactiveColor: '#888',
    },
    {
      icon: ThumbsUp,
      active: thumbsUp,
      onPress: () => setThumbsUp(!thumbsUp),
      activeColor: '#4ECDC4',
      inactiveColor: '#888',
    },
    {
      icon: Bookmark,
      active: bookmarked,
      onPress: () => setBookmarked(!bookmarked),
      activeColor: '#FECA57',
      inactiveColor: '#888',
    },
    {
      icon: Share,
      active: false,
      onPress: () => {},
      activeColor: '#45B7D1',
      inactiveColor: '#888',
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
      }}
    >
      {iconButtons.map(
        ({ icon, active, onPress, activeColor, inactiveColor }, index) => (
          <Button key={index} variant='ghost' size='icon' onPress={onPress}>
            <Icon
              name={icon}
              size={24}
              color={active ? activeColor : inactiveColor}
              fill={active ? activeColor : 'transparent'}
              fillOpacity={active ? 0.2 : 0}
            />
          </Button>
        )
      )}
    </View>
  );
}
