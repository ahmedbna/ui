import { EmptyState } from '@/components/ui/empty-state';
import { View } from '@/components/ui/view';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react-native';
import React from 'react';

export function EmptyStateDemo() {
  return (
    <View style={{ gap: 20 }}>
      <EmptyState
        icon={Search}
        title="No Results Found"
        description="Try adjusting your search or filters to find what you're looking for."
        action={<Button variant="outline">Clear Filters</Button>}
      />
    </View>
  );
}
