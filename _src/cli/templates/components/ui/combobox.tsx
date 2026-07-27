import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { ChevronDown } from 'lucide-react-native';
import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// --- 1. DEFINE A SHARED OPTION TYPE ---
export interface OptionType {
  value: string;
  label: string;
}

// Helper to extract a simple string label from children
const getLabelFromChildren = (children: ReactNode): string => {
  let label = '';
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      label += child;
    }
  });
  return label;
};

interface ComboboxContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: OptionType | null;
  setValue: (option: OptionType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  triggerLayout: { x: number; y: number; width: number; height: number };
  setTriggerLayout: (layout: any) => void;
  disabled: boolean;
  multiple: boolean;
  values: OptionType[];
  setValues: (options: OptionType[]) => void;
  filteredItemsCount: number;
  setFilteredItemsCount: (count: number) => void;
}

const ComboboxContext = createContext<ComboboxContextType | undefined>(
  undefined
);

const useCombobox = () => {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error('Combobox components must be used within a Combobox');
  }
  return context;
};

interface ComboboxProps {
  children: ReactNode;
  value?: OptionType | null;
  onValueChange?: (option: OptionType | null) => void;
  disabled?: boolean;
  multiple?: boolean;
  values?: OptionType[];
  onValuesChange?: (options: OptionType[]) => void;
}

export function Combobox({
  children,
  value = null,
  onValueChange,
  disabled = false,
  multiple = false,
  values = [],
  onValuesChange,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItemsCount, setFilteredItemsCount] = useState(0);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const setValue = (newOption: OptionType) => {
    if (multiple) {
      const isAlreadySelected = values.some((v) => v.value === newOption.value);
      const newValues = isAlreadySelected
        ? values.filter((v) => v.value !== newOption.value)
        : [...values, newOption];
      onValuesChange?.(newValues);
    } else {
      onValueChange?.(newOption);
    }
  };

  const setValues = (newOptions: OptionType[]) => {
    onValuesChange?.(newOptions);
  };

  return (
    <ComboboxContext.Provider
      value={{
        isOpen,
        setIsOpen,
        value,
        setValue,
        searchQuery,
        setSearchQuery,
        triggerLayout,
        setTriggerLayout,
        disabled,
        multiple,
        values,
        setValues,
        filteredItemsCount,
        setFilteredItemsCount,
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}

interface ComboboxTriggerProps {
  children: ReactNode;
  style?: ViewStyle;
  error?: boolean;
}

export function ComboboxTrigger({
  children,
  style,
  error = false,
}: ComboboxTriggerProps) {
  const { setIsOpen, setTriggerLayout, disabled, isOpen } = useCombobox();
  const triggerRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);
  const cardColor = useColor('card');
  const destructiveColor = useColor('destructive');
  const mutedColor = useColor('textMuted');

  const measureTrigger = () => {
    if (triggerRef.current) {
      triggerRef.current.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  const handlePress = () => {
    if (disabled) return;
    measureTrigger();
    setIsOpen(true);
  };

  return (
    <TouchableOpacity
      ref={triggerRef}
      style={[
        styles.trigger,
        {
          backgroundColor: cardColor,
          borderColor: error ? destructiveColor : cardColor,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.triggerContent}>{children}</View>
      <ChevronDown
        size={20}
        color={mutedColor}
        strokeWidth={2}
        style={[
          styles.chevron,
          { transform: [{ rotate: isOpen ? '180deg' : '0deg' }] },
        ]}
      />
    </TouchableOpacity>
  );
}

interface ComboboxValueProps {
  placeholder?: string;
  style?: TextStyle;
}

export function ComboboxValue({
  placeholder = 'Select...',
  style,
}: ComboboxValueProps) {
  const { value, values, multiple } = useCombobox();
  const textColor = useColor('text');
  const mutedColor = useColor('textMuted');

  const hasValue = multiple ? values.length > 0 : !!value;

  const displayText = multiple
    ? values.length === 0
      ? placeholder
      : values.length === 1
      ? values[0].label
      : `${values.length} selected`
    : value?.label || placeholder;

  return (
    <Text
      style={[
        styles.valueText,
        {
          color: hasValue ? textColor : mutedColor,
        },
        style,
      ]}
      numberOfLines={1}
    >
      {displayText}
    </Text>
  );
}

interface ComboboxContentProps {
  children: ReactNode;
  maxHeight?: number;
}

export function ComboboxContent({
  children,
  maxHeight = 400,
}: ComboboxContentProps) {
  const { isOpen, setIsOpen, setSearchQuery, triggerLayout } = useCombobox();
  const cardColor = useColor('card');
  const borderColor = useColor('border');

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const screenHeight = Dimensions.get('window').height;
  const availableHeight =
    screenHeight - triggerLayout.y - triggerLayout.height - 100;
  const dropdownHeight = Math.min(maxHeight, availableHeight);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType='fade'
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: cardColor,
              borderColor: borderColor,
              top: triggerLayout.y + triggerLayout.height + 6,
              left: triggerLayout.x,
              width: triggerLayout.width,
              maxHeight: dropdownHeight,
            },
          ]}
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}

interface ComboboxInputProps {
  placeholder?: string;
  style?: ViewStyle;
  autoFocus?: boolean;
}

export function ComboboxInput({
  placeholder = 'Search...',
  style,
  autoFocus = true,
}: ComboboxInputProps) {
  const { searchQuery, setSearchQuery } = useCombobox();
  const textColor = useColor('text');
  const mutedColor = useColor('textMuted');
  const borderColor = useColor('border');

  return (
    <View
      style={[
        styles.searchContainer,
        { borderBottomColor: borderColor },
        style,
      ]}
    >
      <TextInput
        style={[styles.searchInput, { color: textColor }]}
        placeholder={placeholder}
        placeholderTextColor={mutedColor}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus={autoFocus}
      />
    </View>
  );
}

interface ComboboxListProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function ComboboxList({ children, style }: ComboboxListProps) {
  const { searchQuery, setFilteredItemsCount } = useCombobox();

  const filteredChildren = Children.toArray(children).filter((child) => {
    if (!searchQuery) return true;

    if (isValidElement(child) && child.type === ComboboxItem) {
      const props = child.props as any;
      const label = getLabelFromChildren(props.children);
      const searchText = props.searchValue || label || props.value || '';
      return searchText.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (isValidElement(child) && child.type === ComboboxGroup) {
      const groupProps = child.props as any;
      const groupChildren = Children.toArray(groupProps.children);

      return groupChildren.some((groupChild) => {
        if (isValidElement(groupChild) && groupChild.type === ComboboxItem) {
          const itemProps = groupChild.props as any;
          const label = getLabelFromChildren(itemProps.children);
          const searchText =
            itemProps.searchValue || label || itemProps.value || '';
          return searchText.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    }

    return true;
  });

  const countFilteredItems = (nodes: React.ReactNode[]): number => {
    return nodes.reduce<number>((count, node) => {
      if (isValidElement(node)) {
        if (node.type === ComboboxItem) {
          return count + 1;
        }
        if (node.type === ComboboxGroup) {
          const groupChildren = Children.toArray((node.props as any).children);
          return count + countFilteredItems(groupChildren);
        }
      }
      return count;
    }, 0);
  };

  const itemCount = countFilteredItems(filteredChildren);

  useEffect(() => {
    setFilteredItemsCount(itemCount);
  }, [itemCount, setFilteredItemsCount]);

  return (
    <ScrollView
      style={[styles.optionsList, style]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'
    >
      {filteredChildren}
    </ScrollView>
  );
}

interface ComboboxEmptyProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function ComboboxEmpty({ children, style }: ComboboxEmptyProps) {
  const { searchQuery, filteredItemsCount } = useCombobox();
  const mutedColor = useColor('textMuted');

  if (filteredItemsCount > 0) return null;

  return (
    <View style={[styles.emptyContainer, style]}>
      {typeof children === 'string' ? (
        <Text style={[styles.emptyText, { color: mutedColor }]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

interface ComboboxGroupProps {
  children: ReactNode;
  heading?: string;
}

export function ComboboxGroup({ children, heading }: ComboboxGroupProps) {
  const { searchQuery } = useCombobox();
  const mutedColor = useColor('textMuted');

  const filteredChildren = Children.toArray(children).filter((child) => {
    if (!searchQuery) return true;

    if (isValidElement(child) && child.type === ComboboxItem) {
      const props = child.props as any;
      const label = getLabelFromChildren(props.children);
      const searchText = props.searchValue || label || props.value || '';
      return searchText.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  if (searchQuery && filteredChildren.length === 0) return null;

  return (
    <View>
      {heading && (
        <Text style={[styles.groupHeading, { color: mutedColor }]}>
          {heading}
        </Text>
      )}
      {filteredChildren}
    </View>
  );
}

interface ComboboxItemProps {
  children: ReactNode;
  value: string; // The unique value is still a string
  onSelect?: (value: OptionType) => void;
  disabled?: boolean;
  searchValue?: string;
  style?: ViewStyle;
}

export function ComboboxItem({
  children,
  value: itemValue,
  onSelect,
  disabled = false,
  style,
}: ComboboxItemProps) {
  const {
    setValue,
    setIsOpen,
    multiple,
    values: selectedValues,
    value: selectedValue,
  } = useCombobox();
  const textColor = useColor('text');
  const primaryColor = useColor('primary');

  const isSelected = multiple
    ? selectedValues.some((v) => v.value === itemValue)
    : selectedValue?.value === itemValue;

  const handleSelect = () => {
    if (disabled) return;

    const label = getLabelFromChildren(children);
    const selectedOption: OptionType = { value: itemValue, label };

    onSelect?.(selectedOption);
    setValue(selectedOption);

    if (!multiple) {
      setIsOpen(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.option,
        {
          backgroundColor: isSelected ? `${primaryColor}15` : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={handleSelect}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.optionText,
            {
              color: textColor,
              fontWeight: isSelected ? '600' : '400',
            },
          ]}
        >
          {children}
        </Text>
      ) : (
        Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { isSelected } as any);
          }
          return child;
        })
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: CORNERS,
    borderWidth: 1,
  },
  triggerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: FONT_SIZE,
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdown: {
    position: 'absolute',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    height: HEIGHT,
  },
  searchInput: {
    fontSize: FONT_SIZE,
    flex: 1,
  },
  optionsList: {
    maxHeight: 400,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONT_SIZE,
    fontStyle: 'italic',
  },
  groupHeading: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  optionText: {
    fontSize: FONT_SIZE,
    flex: 1,
  },
});
