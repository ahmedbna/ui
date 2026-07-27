import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { SearchBarInstant } from '@/demo/searchbar/searchbar-instant';

// Main demo screen combining all demo
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

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <SearchBarDemo />
      </View> */}

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

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Instant Search
        </Text>
        <SearchBarInstant />
      </View>
    </View>
  );
}
