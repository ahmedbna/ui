import { ActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function ActionSheetDemo() {
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Edit',
      onPress: () => console.log('Edit pressed'),
    },
    {
      title: 'Share',
      onPress: () => console.log('Share pressed'),
    },
    {
      title: 'Delete',
      onPress: () => console.log('Delete pressed'),
      destructive: true,
    },
  ];

  return (
    <View>
      <Button onPress={() => setVisible(true)}>Show Action Sheet</Button>
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title='Choose an action'
        message='Select one of the options below'
        options={options}
      />
    </View>
  );
}
