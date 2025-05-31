export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ThemeColors {
  primary: {
    50?: string;
    500: string;
    600?: string;
    900?: string;
  } & Partial<ColorScale>;
  secondary: {
    100?: string;
    500: string;
    900?: string;
  } & Partial<ColorScale>;
  accent: {
    100?: string;
    500: string;
    900?: string;
  } & Partial<ColorScale>;
  destructive: {
    500: string;
    600?: string;
    50?: string;
  } & Partial<ColorScale>;
  muted: {
    50?: string;
    100?: string;
    500: string;
  } & Partial<ColorScale>;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface ThemeTypography {
  fontSizes: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  fontWeights: {
    normal: '400';
    medium: '500';
    semibold: '600';
    bold: '700';
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeShadows {
  sm: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  lg: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  xl: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
}

export type ColorScheme = 'light' | 'dark' | 'system';
