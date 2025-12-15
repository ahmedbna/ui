import React, { forwardRef, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, TextInputProps, ViewStyle } from 'react-native';
import { Text } from '../text'; // Updated Text component
import { Icon } from '../icon'; // Updated Icon component
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, FONT_SIZE, SPACING } from '@/constants/designTokens';

export type InputVariant = 'outline' | 'soft' | 'subtle' | 'underline';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  variant?: InputVariant;
  size?: InputSize;
  color?: keyof typeof Colors; // Theme color key
  radius?: InputRadius;
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  icon?: React.ComponentType<any>; // Lucide Icon
  rightIcon?: React.ComponentType<any>;
  onRightIconPress?: () => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      variant = 'outline',
      size = 'md',
      color = 'zinc', // Default color key
      radius = 'md',
      label,
      error,
      containerStyle,
      icon,
      rightIcon,
      onRightIconPress,
      placeholder,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Theme colors
    const themeTextColor = useThemeColor({}, 'text');
    const themeBgColor = useThemeColor({}, 'background');
    const themeCardColor = useThemeColor({}, 'card'); // or use specific logic

    // Resolve dynamic color from Colors constant
    // color prop is e.g. "blue", "zinc". We need to pick a shade.
    const activeColorPalette = (Colors as any)[color] || Colors.zinc;
    const primaryShade = activeColorPalette[500]; // Active/Focus color
    const errorColor = Colors.red[500];
    const placeholderColor = Colors.zinc[400];

    const getHeight = (): number => {
      switch (size) {
        case 'xs': return 32;
        case 'sm': return 36;
        case 'md': return 40;
        case 'lg': return 44;
        case 'xl': return 48;
        case '2xl': return 52;
        default: return 40;
      }
    };

    const getFontSize = (): number => {
      switch (size) {
        case 'xs': return 12;
        case 'sm': return 14;
        case 'md': return 16;
        case 'lg': return 18;
        case 'xl': return 20;
        case '2xl': return 24;
        default: return 16;
      }
    };

    const getRadius = (): number => {
      switch (radius) {
        case 'none': return 0;
        case 'sm': return 4;
        case 'md': return 6;
        case 'lg': return 8;
        case 'xl': return 12;
        case 'full': return 9999;
        default: return 6;
      }
    };

    const getContainerStyle = () => {
      const baseStyle: ViewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        height: getHeight(),
        borderRadius: getRadius(),
        paddingHorizontal: SPACING.SM,
        borderWidth: variant === 'outline' || variant === 'underline' ? 1 : 0,
      };

      if (variant === 'underline') {
        baseStyle.borderRadius = 0;
        baseStyle.borderWidth = 0;
        baseStyle.borderBottomWidth = 1;
        baseStyle.paddingHorizontal = 0; // Underline usually has less padding? Or keep consistent?
      }

      // Colors based on variant and state
      let borderColor: string = Colors.zinc[200]; // Default border
      let backgroundColor = 'transparent';

      if (variant === 'soft') {
        backgroundColor = activeColorPalette[100]; // Light tint
         // Dark mode adjustment needed? For now assuming light/sematic mapping
         // Real app would check scheme.
      } else if (variant === 'subtle') {
         backgroundColor = Colors.zinc[100];
      }

      if (isFocused) {
        borderColor = primaryShade;
         if (variant === 'underline') {
            // style logic for focused underline
         }
      }

      if (error) {
        borderColor = errorColor as string;
      }

      return {
        ...baseStyle,
        borderColor: variant !== 'soft' && variant !== 'subtle' ? borderColor : 'transparent',
        backgroundColor,
      };
    };

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && (
          <Text
            style={[
              styles.label,
              { color: error ? errorColor : themeTextColor, marginBottom: 4 }
            ]}
          >
            {label}
          </Text>
        )}

        <View style={getContainerStyle()}>
          {icon && (
            <Icon
              name={icon}
              size={getFontSize()}
              color={error ? errorColor : (isFocused ? primaryShade : Colors.zinc[400])}
              style={{ marginRight: 8 }}
            />
          )}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              {
                fontSize: getFontSize(),
                color: themeTextColor,
                height: '100%'
              }
            ]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            selectionColor={primaryShade}
            {...props}
          />

          {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress}>
               <Icon
                 name={rightIcon}
                 size={getFontSize()}
                 color={Colors.zinc[400]}
               />
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <Text style={[styles.error, { color: errorColor }]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingVertical: 0, // Reset padding
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});

Input.displayName = 'Input';
