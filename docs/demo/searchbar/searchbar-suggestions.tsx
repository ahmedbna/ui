import { SearchBarWithSuggestions } from '@/components/ui/searchbar';
import React, { useState } from 'react';

export function SearchBarSuggestions() {
  const [searchQuery, setSearchQuery] = useState('');

  const suggestions = [
    'React Native',
    'React Navigation',
    'React Hook Form',
    'Redux Toolkit',
    'Expo Router',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Next.js',
    'Tailwind CSS',
  ];

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <SearchBarWithSuggestions
      placeholder='Type to see suggestions...'
      value={searchQuery}
      onChangeText={setSearchQuery}
      onSearch={handleSearch}
      suggestions={suggestions}
      onSuggestionPress={handleSuggestionPress}
      maxSuggestions={8}
    />
  );
}
