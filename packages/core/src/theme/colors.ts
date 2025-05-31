import { ColorScale, ThemeColors } from './types';

export const slate: ColorScale = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
};

export const blue: ColorScale = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
};

export const red: ColorScale = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
};

export const green: ColorScale = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
};

export const lightThemeColors: ThemeColors = {
  primary: {
    50: blue[50],
    500: blue[500],
    600: blue[600],
    900: blue[900],
  },
  secondary: {
    100: slate[100],
    500: slate[500],
    900: slate[900],
  },
  accent: {
    100: slate[100],
    500: slate[500],
    900: slate[900],
  },
  destructive: {
    500: red[500],
    600: red[600],
    50: red[50],
  },
  muted: {
    50: slate[50],
    100: slate[100],
    500: slate[500],
  },
  background: '#ffffff',
  foreground: slate[900],
  card: '#ffffff',
  cardForeground: slate[900],
  popover: '#ffffff',
  popoverForeground: slate[900],
  border: slate[200],
  input: slate[200],
  ring: blue[500],
};

export const darkThemeColors: ThemeColors = {
  primary: {
    50: blue[950],
    500: blue[400],
    600: blue[500],
    900: blue[50],
  },
  secondary: {
    100: slate[800],
    500: slate[400],
    900: slate[50],
  },
  accent: {
    100: slate[800],
    500: slate[400],
    900: slate[50],
  },
  destructive: {
    500: red[400],
    600: red[500],
    50: red[950],
  },
  muted: {
    50: slate[950],
    100: slate[800],
    500: slate[400],
  },
  background: slate[950],
  foreground: slate[50],
  card: slate[950],
  cardForeground: slate[50],
  popover: slate[950],
  popoverForeground: slate[50],
  border: slate[800],
  input: slate[800],
  ring: blue[400],
};
