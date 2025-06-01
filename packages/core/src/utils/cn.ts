import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * Utility to conditionally apply styles in React Native
 * Merges style objects and arrays conditionally
 */
export function mergeStyles(
  ...styles: (Style | undefined | false | null)[]
): Style {
  return styles.reduce<Style>((acc: Style, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {} as Style);
}

/**
 * Utility to create responsive styles based on screen dimensions
 */
export function createResponsiveStyle<T>(
  small: T,
  medium?: T,
  large?: T
): (width: number, height: number) => T {
  return (width: number, height: number) => {
    if (large && width >= 768) return large;
    if (medium && width >= 480) return medium;
    return small;
  };
}
