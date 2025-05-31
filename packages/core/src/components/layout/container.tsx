import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';

export interface ContainerProps extends ViewProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: keyof typeof spacing | number;
  children: React.ReactNode;
}

const maxWidths = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  full: '100%',
};

const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'full',
  padding = 'md',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      maxWidth: maxWidths[maxWidth],
      width: '100%',
      marginHorizontal: 'auto',
      paddingHorizontal:
        typeof padding === 'number'
          ? padding
          : theme.spacing[padding] || theme.spacing.md,
    },
  });

  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};
