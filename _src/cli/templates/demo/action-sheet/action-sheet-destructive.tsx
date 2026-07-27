import { ActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { AlertTriangle, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';

export function ActionSheetDestructive() {
  const [visible, setVisible] = useState(false);

  const options = [
    {
      title: 'Remove from Library',
      onPress: () => console.log('Remove from library'),
      destructive: true,
    },
    {
      title: 'Delete Permanently',
      onPress: () => console.log('Delete permanently'),
      destructive: true,
      icon: <Icon name={Trash2} size={20} />,
    },
    {
      title: 'Report Content',
      onPress: () => console.log('Report content'),
      destructive: true,
      icon: <Icon name={AlertTriangle} size={20} />,
    },
  ];

  return (
    <>
      <Button variant='destructive' onPress={() => setVisible(true)}>
        Destructive Actions
      </Button>
      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title='Are you sure?'
        message='These actions cannot be undone'
        options={options}
      />
    </>
  );
}
