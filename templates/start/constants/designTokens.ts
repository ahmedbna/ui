export const SPACING = {
  XXS: 2,
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64,
} as const;

export const BORDER_RADIUS = {
  XS: 4,
  SM: 6,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 24,
  FULL: 9999,
} as const;

export const FONT_SIZE = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  TITLE: 32,
} as const;

export const ICON_SIZE = {
  XS: 14,
  SM: 18,
  MD: 22,
  LG: 26,
  XL: 30,
  XXL: 34,
} as const;

export const LINE_HEIGHT = {
  XS: 16,
  SM: 20,
  MD: 24,
  LG: 28,
  XL: 28,
  XXL: 32,
  TITLE: 40,
} as const;

export const OPACITY = {
  TRANSPARENT: 0,
  SUBTLE: 0.1,
  MUTED: 0.5,
  VISIBLE: 0.8,
  OPAQUE: 1,
} as const;

export const BORDER_WIDTH = {
  HAIRLINE: 0.5,
  THIN: 1,
  THICK: 2,
} as const;

export const DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const Z_INDEX = {
  BASE: 0,
  OVERLAY: 10,
  MODAL: 50,
  TOAST: 100,
} as const;

export const THEME_SHADES = {
  LIGHT: {
    TEXT: 950,
    BACKGROUND: 50,
    BORDER: 200,
  },
  DARK: {
    TEXT: 50,
    BACKGROUND: 950,
    BORDER: 800,
  },
} as const;
