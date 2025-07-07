import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import { LucideProps } from 'lucide-react-native';
import React from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ToggleVariant = 'default' | 'outline';
type ToggleSize = 'default' | 'icon';

interface ToggleProps {
  children: React.ReactNode;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Toggle({
  children,
  pressed = false,
  onPressedChange,
  variant = 'default',
  size = 'icon',
  disabled = false,
  style,
  textStyle,
}: ToggleProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryColor = useThemeColor({}, 'secondary');
  const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');
  const borderColor = useThemeColor({}, 'border');

  const handlePress = () => {
    if (!disabled) {
      onPressedChange?.(!pressed);
    }
  };

  const getToggleStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: CORNERS,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size variants - following button component pattern
    switch (size) {
      case 'icon':
        Object.assign(baseStyle, {
          width: HEIGHT,
          height: HEIGHT,
        });
        break;
      default:
        Object.assign(baseStyle, { height: HEIGHT, paddingHorizontal: 32 });
    }

    // State and variant styles - following button component pattern
    if (pressed) {
      switch (variant) {
        case 'outline':
          return {
            ...baseStyle,
            backgroundColor: primaryColor,
            borderWidth: 1,
            borderColor: primaryColor,
          };
        default:
          return {
            ...baseStyle,
            backgroundColor: primaryColor,
          };
      }
    } else {
      switch (variant) {
        case 'outline':
          return {
            ...baseStyle,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: borderColor,
          };
        default:
          return {
            ...baseStyle,
            backgroundColor: secondaryColor,
          };
      }
    }
  };

  const getToggleTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: FONT_SIZE,
      fontWeight: '500',
    };

    if (pressed) {
      switch (variant) {
        case 'outline':
          return { ...baseTextStyle, color: primaryForegroundColor };
        default:
          return { ...baseTextStyle, color: primaryForegroundColor };
      }
    } else {
      switch (variant) {
        case 'outline':
          return { ...baseTextStyle, color: primaryColor };
        default:
          return { ...baseTextStyle, color: secondaryForegroundColor };
      }
    }
  };

  const toggleStyle = getToggleStyle();
  const finalTextStyle = getToggleTextStyle();

  return (
    <TouchableOpacity
      style={[toggleStyle, disabled && { opacity: 0.5 }, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {typeof children === 'string' ? (
        <Text style={[finalTextStyle, textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

type ToggleGroupType = 'single' | 'multiple';
type ToggleGroupVariant = 'default' | 'outline';
type ToggleGroupSize = 'default' | 'icon';

interface ToggleGroupItem {
  value: string;
  label: string;
  icon?: React.ComponentType<LucideProps>;
  disabled?: boolean;
}

interface ToggleGroupProps {
  type?: ToggleGroupType;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  items: ToggleGroupItem[];
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  disabled?: boolean;
  style?: ViewStyle;
  orientation?: 'horizontal' | 'vertical';
}

export function ToggleGroup({
  type = 'single',
  value,
  onValueChange,
  items,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  orientation = 'horizontal',
}: ToggleGroupProps) {
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');

  const handleItemPress = (itemValue: string) => {
    if (disabled) return;

    if (type === 'single') {
      // Single selection
      const newValue = value === itemValue ? undefined : itemValue;
      onValueChange?.(newValue || '');
    } else {
      // Multiple selection
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(itemValue)
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue];
      onValueChange?.(newValues);
    }
  };

  const isItemPressed = (itemValue: string): boolean => {
    if (type === 'single') {
      return value === itemValue;
    } else {
      return Array.isArray(value) && value.includes(itemValue);
    }
  };

  const containerStyle: ViewStyle = {
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: CORNERS,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  };

  const getItemStyle = (index: number): ViewStyle => {
    const isLast = index === items.length - 1;

    const itemStyle: ViewStyle = {
      flex: orientation === 'horizontal' ? 1 : 0,
      borderRadius: 0,
      borderWidth: 0,
      borderRightWidth: orientation === 'horizontal' && !isLast ? 1 : 0,
      borderBottomWidth: orientation === 'vertical' && !isLast ? 1 : 0,
      borderColor: borderColor,
    };

    return itemStyle;
  };

  return (
    <View style={[containerStyle, style]}>
      {items.map((item, index) => (
        <Toggle
          key={item.value}
          pressed={isItemPressed(item.value)}
          onPressedChange={() => handleItemPress(item.value)}
          variant={variant}
          size={size}
          disabled={disabled || item.disabled}
          style={getItemStyle(index)}
        >
          {item.icon && item.label ? (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Icon
                name={item.icon}
                size={16}
                strokeWidth={2.5}
                color={
                  isItemPressed(item.value)
                    ? primaryForegroundColor
                    : variant === 'outline'
                    ? primaryColor
                    : secondaryForegroundColor
                }
              />
              <Text
                style={{
                  color: isItemPressed(item.value)
                    ? primaryForegroundColor
                    : variant === 'outline'
                    ? primaryColor
                    : secondaryForegroundColor,
                }}
              >
                {item.label}
              </Text>
            </View>
          ) : item.icon ? (
            <Icon
              name={item.icon}
              size={16}
              strokeWidth={2.5}
              color={
                isItemPressed(item.value)
                  ? primaryForegroundColor
                  : variant === 'outline'
                  ? primaryColor
                  : secondaryForegroundColor
              }
            />
          ) : (
            <Text
              style={{
                color: isItemPressed(item.value)
                  ? primaryForegroundColor
                  : variant === 'outline'
                  ? primaryColor
                  : secondaryForegroundColor,
              }}
            >
              {item.label}
            </Text>
          )}
        </Toggle>
      ))}
    </View>
  );
}

// Convenience components for common use cases
export function ToggleGroupSingle({
  value,
  onValueChange,
  ...props
}: Omit<ToggleGroupProps, 'type' | 'value' | 'onValueChange'> & {
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const handleValueChange = (newValue: string | string[]) => {
    // For single selection, we know it will always be a string
    onValueChange?.(newValue as string);
  };

  return (
    <ToggleGroup
      type='single'
      value={value}
      onValueChange={handleValueChange}
      {...props}
    />
  );
}

export function ToggleGroupMultiple({
  value,
  onValueChange,
  ...props
}: Omit<ToggleGroupProps, 'type' | 'value' | 'onValueChange'> & {
  value?: string[];
  onValueChange?: (value: string[]) => void;
}) {
  const handleValueChange = (newValue: string | string[]) => {
    // For multiple selection, we know it will always be a string array
    onValueChange?.(newValue as string[]);
  };

  return (
    <ToggleGroup
      type='multiple'
      value={value}
      onValueChange={handleValueChange}
      {...props}
    />
  );
}
