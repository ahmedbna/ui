import { ActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Download, Edit, Share, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';

export function ActionSheetIcons() {
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Edit',
      onPress: () => console.log('Edit pressed'),
      icon: <Icon name={Edit} size={20} />,
    },
    {
      title: 'Share',
      onPress: () => console.log('Share pressed'),
      icon: <Icon name={Share} size={20} />,
    },
    {
      title: 'Download',
      onPress: () => console.log('Download pressed'),
      icon: <Icon name={Download} size={20} />,
    },
    {
      title: 'Delete',
      onPress: () => console.log('Delete pressed'),
      destructive: true,
      icon: <Icon name={Trash2} size={20} />,
    },
  ];

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        Show Action Sheet with Icons
      </Button>
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title='File Actions'
        options={options}
      />
    </>
  );
}
