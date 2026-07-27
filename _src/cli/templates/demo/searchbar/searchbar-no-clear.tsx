import { SearchBar } from '@/components/ui/searchbar';
import React, { useState } from 'react';

export function SearchBarNoClear() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    console.log('Searching without clear button:', query);
  };

  return (
    <SearchBar
      placeholder='Search without clear button...'
      value={searchQuery}
      onChangeText={setSearchQuery}
      onSearch={handleSearch}
      showClearButton={false}
    />
  );
}
