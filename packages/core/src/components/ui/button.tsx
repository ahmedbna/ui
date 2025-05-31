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
  title?: string;
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
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  style,
  textStyle,
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
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 40,
    },
    destructive: {
      backgroundColor: theme.colors.destructive[500],
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 40,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 40,
    },
    secondary: {
      backgroundColor: theme.colors.secondary[500],
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 40,
    },
    ghost: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      minHeight: 40,
    },
    link: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    sm: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      minHeight: 36,
    },
    lg: {
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
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

  const textStyles = StyleSheet.create({
    base: {
      fontSize: theme.typography.fontSizes.base,
      fontWeight: theme.typography.fontWeights.medium,
    },
    default: {
      color: theme.colors.primary[50] || '#ffffff',
    },
    destructive: {
      color: theme.colors.destructive[50] || '#ffffff',
    },
    outline: {
      color: theme.colors.foreground,
    },
    secondary: {
      color: theme.colors.secondary[900] || theme.colors.foreground,
    },
    ghost: {
      color: theme.colors.foreground,
    },
    link: {
      color: theme.colors.primary[500],
      textDecorationLine: 'underline',
    },
    sm: {
      fontSize: theme.typography.fontSizes.sm,
    },
    lg: {
      fontSize: theme.typography.fontSizes.lg,
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

  const getTextStyle = (): TextStyle[] => {
    const styles = [textStyles.base, textStyles[variant]];

    if (size !== 'default' && size in textStyles) {
      styles.push(textStyles[size as keyof typeof textStyles]);
    }

    if (textStyle) {
      styles.push(textStyle);
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
      {loading && (
        <ActivityIndicator
          size='small'
          color={
            variant === 'outline' || variant === 'ghost'
              ? theme.colors.foreground
              : '#ffffff'
          }
          style={{ marginRight: children || title ? 8 : 0 }}
        />
      )}
      {children || <Text style={getTextStyle()}>{title}</Text>}
    </TouchableOpacity>
  );
};
