import { useActionSheet } from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { View } from '@/components/ui/view';
import { Camera, FileText, Image, Mic } from 'lucide-react-native';
import React from 'react';

export function ActionSheetHook() {
  const { show, ActionSheet } = useActionSheet();

  const showMediaOptions = () => {
    show({
      title: 'Add Media',
      message: 'Choose the type of media to add',
      options: [
        {
          title: 'Take Photo',
          onPress: () => console.log('Take photo'),
          icon: <Icon name={Camera} size={20} />,
        },
        {
          title: 'Choose from Gallery',
          onPress: () => console.log('Choose from gallery'),
          icon: <Icon name={Image} size={20} />,
        },
        {
          title: 'Record Audio',
          onPress: () => console.log('Record audio'),
          icon: <Icon name={Mic} size={20} />,
        },
        {
          title: 'Add Document',
          onPress: () => console.log('Add document'),
          icon: <Icon name={FileText} size={20} />,
        },
      ],
    });
  };

  const showConfirmation = () => {
    show({
      title: 'Confirm Action',
      message: 'This action cannot be undone',
      options: [
        {
          title: 'Yes, Continue',
          onPress: () => console.log('Confirmed'),
          destructive: true,
        },
      ],
    });
  };

  return (
    <View style={{ gap: 12 }}>
      <Button onPress={showMediaOptions}>Add Media</Button>
      <Button variant='outline' onPress={showConfirmation}>
        Show Confirmation
      </Button>
      {ActionSheet}
    </View>
  );
}
