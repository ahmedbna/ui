import { SearchBar } from '@/components/ui/searchbar';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function SearchBarInstant() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const mockData = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
  ];

  const handleInstantSearch = (query: string) => {
    if (query.trim()) {
      const results = mockData.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <SearchBar
        placeholder='Instant search (no debounce)...'
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleInstantSearch}
        debounceMs={0} // No debounce for instant search
      />

      {searchResults.length > 0 && (
        <View style={{ gap: 8 }}>
          <Text variant='caption' style={{ opacity: 0.7 }}>
            Found {searchResults.length} results:
          </Text>
          {searchResults.map((result, index) => (
            <Text key={index} style={{ paddingLeft: 16 }}>
              • {result}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
