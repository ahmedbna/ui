import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../hooks';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  style,
  children,
}) => {
  const theme = useTheme();

  const buttonStyles = StyleSheet.create({
    base: {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    default: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      minHeight: 40,
    },
    destructive: {
      backgroundColor: theme.colors.destructive,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      minHeight: 40,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      minHeight: 40,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      minHeight: 40,
    },
    ghost: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      minHeight: 40,
    },
    link: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1],
    },
    sm: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
      minHeight: 36,
    },
    lg: {
      paddingHorizontal: theme.spacing[8],
      paddingVertical: theme.spacing[3],
      minHeight: 44,
    },
    icon: {
      height: 40,
      width: 40,
      paddingHorizontal: 0,
    },
    disabled: {
      opacity: 0.5,
    },
  });

  const getButtonStyle = (): ViewStyle[] => {
    const styles = [buttonStyles.base, buttonStyles[variant]];

    if (size !== 'default') {
      styles.push(buttonStyles[size]);
    }

    if (disabled || loading) {
      styles.push(buttonStyles.disabled);
    }

    if (style) {
      styles.push(style);
    }

    return styles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};
