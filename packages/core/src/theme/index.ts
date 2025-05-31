import { Theme } from './types';
import { lightThemeColors, darkThemeColors } from './colors';
import { spacing, borderRadius } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';

export const lightTheme: Theme = {
  colors: lightThemeColors,
  spacing,
  typography,
  shadows,
  borderRadius,
};

export const darkTheme: Theme = {
  colors: darkThemeColors,
  spacing,
  typography,
  shadows,
  borderRadius,
};

export const defaultTheme = lightTheme;

export * from './types';
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
