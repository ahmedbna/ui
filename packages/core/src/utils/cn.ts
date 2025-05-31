/**
 * Utility to conditionally apply styles in React Native
 * Merges style objects and arrays conditionally
 */
export function mergeStyles(
  ...styles: (object | undefined | false | null)[]
): object {
  return styles.reduce((acc, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {});
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
