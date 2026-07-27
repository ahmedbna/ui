import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

const items = [
  { id: '1', title: 'Photos', subtitle: '1,234 items' },
  { id: '2', title: 'Videos', subtitle: '56 items' },
  { id: '3', title: 'Documents', subtitle: '89 items' },
  { id: '4', title: 'Audio', subtitle: '23 items' },
  { id: '5', title: 'Downloads', subtitle: '12 items' },
  { id: '6', title: 'Archives', subtitle: '4 items' },
];

export function BottomSheetList() {
  const { isVisible, open, close } = useBottomSheet();

  const renderItem = ({ item }: { item: (typeof items)[0] }) => (
    <TouchableOpacity
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
      }}
      onPress={() => console.log('Selected:', item.title)}
    >
      <Text variant='body' style={{ fontWeight: '600' }}>
        {item.title}
      </Text>
      <Text variant='caption' style={{ marginTop: 2 }}>
        {item.subtitle}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Button onPress={open}>Browse Files</Button>

      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title='File Browser'
        snapPoints={[0.5, 0.8]}
      >
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheet>
    </View>
  );
}
