import { SearchBar } from '@/components/ui/searchbar';
import React, { useState } from 'react';

export function SearchBarDemo() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <SearchBar
      placeholder='Search for anything...'
      value={searchQuery}
      onChangeText={setSearchQuery}
      onSearch={handleSearch}
    />
  );
}
