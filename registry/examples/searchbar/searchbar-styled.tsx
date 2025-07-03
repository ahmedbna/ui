import { SearchBar } from '@/components/ui/searchbar';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function SearchBarStyled() {
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [query3, setQuery3] = useState('');

  return (
    <View style={{ gap: 16 }}>
      {/* Rounded with gradient-like background */}
      <SearchBar
        placeholder='Rounded search...'
        value={query1}
        onChangeText={setQuery1}
        containerStyle={{
          borderRadius: 25,
          borderWidth: 1.5,
          borderColor: 'green',
        }}
        inputStyle={{
          color: 'green',
          fontWeight: '500',
        }}
      />

      {/* Minimal flat design */}
      <SearchBar
        placeholder='Minimal search...'
        value={query2}
        onChangeText={setQuery2}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#374151',
          borderRadius: 0,
          paddingHorizontal: 0,
        }}
        inputStyle={{
          fontSize: 16,
          fontWeight: '400',
        }}
      />

      {/* Dark theme with custom height */}
      <SearchBar
        placeholder='Custom dark search...'
        value={query3}
        onChangeText={setQuery3}
        containerStyle={{
          backgroundColor: '#1f2937',
          borderRadius: 12,
          height: 56,
          borderWidth: 1,
          borderColor: '#374151',
        }}
        inputStyle={{
          color: '#f9fafb',
          fontSize: 16,
        }}
      />
    </View>
  );
}
