import React, { forwardRef } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'default' | 'lg';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  hintStyle?: TextStyle;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      variant = 'default',
      size = 'default',
      containerStyle,
      inputStyle,
      labelStyle,
      errorStyle,
      hintStyle,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
      container: {
        marginBottom: theme.spacing.sm,
      },
      label: {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.foreground,
        marginBottom: theme.spacing.xs,
      },
      inputContainer: {
        position: 'relative',
      },
      input: {
        fontSize: theme.typography.fontSizes.base,
        color: theme.colors.foreground,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.sm,
      },
      default: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: 'transparent',
      },
      outline: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: 'transparent',
      },
      filled: {
        borderWidth: 0,
        backgroundColor: theme.colors.muted[100] || theme.colors.card,
      },
      sm: {
        fontSize: theme.typography.fontSizes.sm,
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: theme.spacing.xs,
        minHeight: 32,
      },
      lg: {
        fontSize: theme.typography.fontSizes.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
      },
      error: {
        borderColor: theme.colors.destructive[500] || '#ef4444',
      },
      errorText: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.destructive[500] || '#ef4444',
        marginTop: theme.spacing.xs,
      },
      hint: {
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.muted[500] || theme.colors.foreground,
        marginTop: theme.spacing.xs,
        opacity: 0.7,
      },
    });

    const getInputStyle = (): TextStyle[] => {
      const inputStyles = [styles.input, styles[variant]];

      if (size !== 'default') {
        inputStyles.push(styles[size]);
      }

      if (error) {
        inputStyles.push(styles.error);
      }

      if (inputStyle) {
        inputStyles.push(inputStyle);
      }

      return inputStyles;
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref}
            style={getInputStyle()}
            placeholderTextColor={theme.colors.muted[500]}
            {...props}
          />
        </View>
        {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
        {hint && !error && <Text style={[styles.hint, hintStyle]}>{hint}</Text>}
      </View>
    );
  }
);
