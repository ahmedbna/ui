import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { Search, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  loading?: boolean;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  debounceMs?: number;
}

export function SearchBar({
  loading = false,
  onSearch,
  onClear,
  showClearButton = true,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  debounceMs = 300,
  placeholder = 'Search...',
  value,
  onChangeText,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value || '');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<TextInput>(null);

  // Theme colors
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const muted = useThemeColor({}, 'textMuted');
  const icon = useThemeColor({}, 'icon');

  // Handle text change with debouncing
  const handleTextChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);

      if (onSearch && debounceMs > 0) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        (debounceRef.current as any) = setTimeout(() => {
          onSearch(text);
        }, debounceMs);
      } else if (onSearch) {
        onSearch(text);
      }
    },
    [onChangeText, onSearch, debounceMs]
  );

  // Handle clear button press
  const handleClear = useCallback(() => {
    setInternalValue('');
    onChangeText?.('');
    onClear?.();
    onSearch?.('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, [onChangeText, onClear, onSearch]);

  // Get container style based on variant and size
  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cardColor,
    height: HEIGHT,
    paddingHorizontal: 16,
    borderRadius: CORNERS,
  };

  const baseInputStyle = {
    flex: 1,
    fontSize: FONT_SIZE,
    color: textColor,
    marginHorizontal: 8,
  };

  const displayValue = value !== undefined ? value : internalValue;
  const showClear = showClearButton && displayValue.length > 0;

  return (
    <View style={[baseStyle, containerStyle]}>
      {/* Left Icon */}
      {leftIcon || <Icon name={Search} size={16} color={muted} />}

      {/* Text Input */}
      <TextInput
        ref={inputRef}
        style={[baseInputStyle, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={muted}
        value={displayValue}
        onChangeText={handleTextChange}
        {...props}
      />

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size='small'
          color={muted}
          style={{ marginRight: 4 }}
        />
      )}

      {/* Clear Button */}
      {showClear && !loading && (
        <TouchableOpacity
          onPress={handleClear}
          style={{
            backgroundColor: icon,
            padding: 4,
            borderRadius: CORNERS,
            opacity: 0.6,
          }}
          activeOpacity={0.7}
        >
          <Icon name={X} size={16} color={cardColor} strokeWidth={2} />
        </TouchableOpacity>
      )}

      {/* Right Icon */}
      {rightIcon && !showClear && !loading && rightIcon}
    </View>
  );
}

// SearchBar with suggestions dropdown
interface SearchBarWithSuggestionsProps extends SearchBarProps {
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
  maxSuggestions?: number;
  showSuggestions?: boolean;
}

export function SearchBarWithSuggestions({
  suggestions = [],
  onSuggestionPress,
  maxSuggestions = 5,
  showSuggestions = true,
  containerStyle,
  ...searchBarProps
}: SearchBarWithSuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion
        .toLowerCase()
        .includes((searchBarProps.value || '').toLowerCase())
    )
    .slice(0, maxSuggestions);

  const shouldShowSuggestions =
    showSuggestions &&
    isExpanded &&
    filteredSuggestions.length > 0 &&
    (searchBarProps.value || '').length > 0;

  const handleSuggestionPress = (suggestion: string) => {
    onSuggestionPress?.(suggestion);
    setIsExpanded(false);
  };

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <SearchBar
        {...searchBarProps}
        onFocus={(e) => {
          setIsExpanded(true);
          searchBarProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          // Delay hiding suggestions to allow for suggestion tap
          setTimeout(() => setIsExpanded(false), 150);
          searchBarProps.onBlur?.(e);
        }}
      />

      {/* Suggestions Dropdown */}
      {shouldShowSuggestions && (
        <View
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: cardColor,
            marginTop: 8,
            borderRadius: 12,
            maxHeight: 200,
            zIndex: 999,
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={`${suggestion}-${index}`}
              onPress={() => handleSuggestionPress(suggestion)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth:
                  index < filteredSuggestions.length - 1 ? 0.6 : 0,
                borderBottomColor: borderColor,
              }}
              activeOpacity={0.7}
            >
              <Text>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
