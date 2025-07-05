import { ActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Bookmark, Heart, Send, Star } from 'lucide-react-native';
import React, { useState } from 'react';

export function ActionSheetStyled() {
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Add to Favorites',
      onPress: () => console.log('Add to favorites'),
      icon: <Icon name={Heart} size={20} color='#FF6B6B' />,
    },
    {
      title: 'Rate this Item',
      onPress: () => console.log('Rate item'),
      icon: <Icon name={Star} size={20} color='#FFD93D' />,
    },
    {
      title: 'Save for Later',
      onPress: () => console.log('Save for later'),
      icon: <Icon name={Bookmark} size={20} color='#4ECDC4' />,
    },
    {
      title: 'Share with Friends',
      onPress: () => console.log('Share with friends'),
      icon: <Icon name={Send} size={20} color='#45B7D1' />,
    },
  ];

  return (
    <>
      <Button variant='secondary' onPress={() => setVisible(true)}>
        Custom Styled Sheet
      </Button>
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title='✨ Quick Actions'
        message='Choose how you want to interact with this item'
        options={options}
        cancelButtonTitle='Maybe Later'
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      />
    </>
  );
}
