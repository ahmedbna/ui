import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import React, { useState } from 'react';

// Generate a large dataset
const generateLargeDataset = () => {
  const categories = [
    'Technology',
    'Science',
    'Arts',
    'Sports',
    'Business',
    'Health',
  ];
  const adjectives = [
    'Amazing',
    'Innovative',
    'Creative',
    'Dynamic',
    'Efficient',
    'Modern',
  ];
  const nouns = [
    'Solution',
    'Platform',
    'System',
    'Framework',
    'Tool',
    'Service',
  ];

  const items = [];
  for (let i = 0; i < 200; i++) {
    const category = categories[i % categories.length];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    items.push({
      value: `item-${i}`,
      label: `${adjective} ${category} ${noun} ${i + 1}`,
      searchValue: `${category} ${adjective} ${noun}`,
    });
  }

  return items;
};

const largeDataset = generateLargeDataset();

export function ComboboxLarge() {
  const [value, setValue] = useState('');

  return (
    <Combobox value={value} onValueChange={setValue}>
      <ComboboxTrigger>
        <ComboboxValue placeholder='Search from 200+ items...' />
      </ComboboxTrigger>
      <ComboboxContent maxHeight={300}>
        <ComboboxInput placeholder='Type to search...' />
        <ComboboxList>
          <ComboboxEmpty>No items found in dataset.</ComboboxEmpty>
          {largeDataset.map((item) => (
            <ComboboxItem
              key={item.value}
              value={item.value}
              searchValue={item.searchValue}
            >
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
