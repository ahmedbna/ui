// Example usage of ActionSheet component
import {
  ActionSheet,
  ActionSheetOption,
  useActionSheet,
} from '@/components/ui/action-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Copy, Edit3, Eye, Share, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

export default function ActionSheetExample() {
  // Method 1: Using the hook (recommended)
  const { show: showActionSheet, ActionSheet: ActionSheetComponent } =
    useActionSheet();

  // Method 2: Manual state management
  const [isActionSheetVisible, setActionSheetVisible] = useState(false);

  const handleBasicActionSheet = () => {
    const options: ActionSheetOption[] = [
      {
        title: 'Edit',
        onPress: () => Alert.alert('Edit pressed'),
        icon: <Edit3 size={20} color='#007AFF' />,
      },
      {
        title: 'Share',
        onPress: () => Alert.alert('Share pressed'),
        icon: <Share size={20} color='#007AFF' />,
      },
      {
        title: 'Copy Link',
        onPress: () => Alert.alert('Copy pressed'),
        icon: <Copy size={20} color='#007AFF' />,
      },
      {
        title: 'Delete',
        onPress: () => Alert.alert('Delete pressed'),
        destructive: true,
        icon: <Trash2 size={20} color='#FF3B30' />,
      },
    ];

    showActionSheet({
      title: 'Choose an action',
      message: 'What would you like to do with this item?',
      options,
    });
  };

  const handleDestructiveActionSheet = () => {
    const options: ActionSheetOption[] = [
      {
        title: 'Delete Item',
        onPress: () => Alert.alert('Item deleted'),
        destructive: true,
        icon: <Trash2 size={20} color='#FF3B30' />,
      },
    ];

    showActionSheet({
      title: 'Delete Item',
      message:
        'This action cannot be undone. Are you sure you want to delete this item?',
      options,
      cancelButtonTitle: 'Keep Item',
    });
  };

  const handleLongActionSheet = () => {
    const options: ActionSheetOption[] = [
      {
        title: 'View Details',
        onPress: () => Alert.alert('View Details'),
        icon: <Eye size={20} color='#007AFF' />,
      },
      {
        title: 'Edit Information',
        onPress: () => Alert.alert('Edit Information'),
        icon: <Edit3 size={20} color='#007AFF' />,
      },
      {
        title: 'Share with Friends',
        onPress: () => Alert.alert('Share with Friends'),
        icon: <Share size={20} color='#007AFF' />,
      },
      {
        title: 'Copy to Clipboard',
        onPress: () => Alert.alert('Copy to Clipboard'),
        icon: <Copy size={20} color='#007AFF' />,
      },
      {
        title: 'Disabled Option',
        onPress: () => Alert.alert('This should not appear'),
        disabled: true,
      },
      {
        title: 'Another Option',
        onPress: () => Alert.alert('Another Option'),
      },
      {
        title: 'One More Option',
        onPress: () => Alert.alert('One More Option'),
      },
      {
        title: 'Final Option',
        onPress: () => Alert.alert('Final Option'),
      },
      {
        title: 'Delete Everything',
        onPress: () => Alert.alert('Delete Everything'),
        destructive: true,
        icon: <Trash2 size={20} color='#FF3B30' />,
      },
    ];

    showActionSheet({
      title: 'Multiple Options',
      message:
        'This is an example with many options to demonstrate scrolling behavior.',
      options,
    });
  };

  // Manual ActionSheet options
  const manualOptions: ActionSheetOption[] = [
    {
      title: 'Option 1',
      onPress: () => Alert.alert('Manual Option 1'),
    },
    {
      title: 'Option 2',
      onPress: () => Alert.alert('Manual Option 2'),
    },
    {
      title: 'Delete',
      onPress: () => Alert.alert('Manual Delete'),
      destructive: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant='title' style={styles.title}>
        ActionSheet demo
      </Text>

      <Text variant='caption' style={styles.subtitle}>
        iOS uses native ActionSheet, Android uses custom implementation
      </Text>

      <View style={styles.buttonContainer}>
        <Button onPress={handleBasicActionSheet} style={styles.button}>
          Basic ActionSheet
        </Button>

        <Button
          variant='destructive'
          onPress={handleDestructiveActionSheet}
          style={styles.button}
        >
          Destructive ActionSheet
        </Button>

        <Button
          variant='secondary'
          onPress={handleLongActionSheet}
          style={styles.button}
        >
          Long ActionSheet
        </Button>

        <Button
          onPress={() => setActionSheetVisible(true)}
          variant='outline'
          style={styles.button}
        >
          Manual ActionSheet
        </Button>
      </View>

      {/* Using the hook (recommended) */}
      {ActionSheetComponent}

      {/* Manual implementation */}
      <ActionSheet
        visible={isActionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        title='Manual ActionSheet'
        message='This ActionSheet is managed manually with useState'
        options={manualOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    marginBottom: 0,
  },
});
