import { SearchBar } from '@/components/ui/searchbar';
import React, { useState } from 'react';

export function SearchBarLoading() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        console.log('Search completed for:', query);
      }, 2000);
    }
  };

  return (
    <SearchBar
      placeholder='Search with loading state...'
      value={searchQuery}
      onChangeText={setSearchQuery}
      onSearch={handleSearch}
      loading={loading}
    />
  );
}
