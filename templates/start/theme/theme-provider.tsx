import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as RNThemeProvider,
} from '@react-navigation/native';
import { AppTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const colorScheme = useColorScheme();

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: AppTheme.light.primary,
      background: AppTheme.light.background,
      card: AppTheme.light.card,
      text: AppTheme.light.text,
      border: AppTheme.light.border,
      notification: AppTheme.light.error,
    },
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: AppTheme.dark.primary,
      background: AppTheme.dark.background,
      card: AppTheme.dark.card,
      text: AppTheme.dark.text,
      border: AppTheme.dark.border,
      notification: AppTheme.dark.error,
    },
  };

  return (
    <RNThemeProvider
      value={colorScheme === 'dark' ? customDarkTheme : customLightTheme}
    >
      {children}
    </RNThemeProvider>
  );
};
