import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function CheckboxGroup() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const items = [
    { id: 'notifications', label: 'Email notifications' },
    { id: 'marketing', label: 'Marketing emails' },
    { id: 'updates', label: 'Product updates' },
    { id: 'newsletter', label: 'Weekly newsletter' },
  ];

  const handleItemChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <Text variant='subtitle'>Subscription Preferences</Text>

      <View style={{ gap: 12 }}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={(checked) => handleItemChange(item.id, checked)}
            label={item.label}
          />
        ))}
      </View>

      <Text variant='caption' style={{ marginTop: 8 }}>
        Selected: {selectedItems.length} item(s)
      </Text>
    </View>
  );
}
