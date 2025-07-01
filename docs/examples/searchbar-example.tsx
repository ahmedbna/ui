// registry/examples/searchbar-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { SearchBarDemo } from '@/docs/demo/searchbar/searchbar-demo';
import { SearchBarLoading } from '@/docs/demo/searchbar/searchbar-loading';
import { SearchBarIcons } from '@/docs/demo/searchbar/searchbar-icons';
import { SearchBarSuggestions } from '@/docs/demo/searchbar/searchbar-suggestions';
import { SearchBarStyled } from '@/docs/demo/searchbar/searchbar-styled';
import { SearchBarNoClear } from '@/docs/demo/searchbar/searchbar-no-clear';
import { SearchBarInstant } from '@/docs/demo/searchbar/searchbar-instant';
import React from 'react';
import { ScrollView } from 'react-native';

// Main demo screen combining all examples
export function SearchBarExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Searchbar
      </Text>

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <SearchBarDemo />
      </View>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Loading State
        </Text>
        <SearchBarLoading />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Icons
        </Text>
        <SearchBarIcons />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          With Suggestions
        </Text>
        <SearchBarSuggestions />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Styling
        </Text>
        <SearchBarStyled />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Without Clear Button
        </Text>
        <SearchBarNoClear />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Instant Search
        </Text>
        <SearchBarInstant />
      </View> */}
    </View>
  );
}
