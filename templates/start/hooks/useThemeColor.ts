import { useColorScheme } from '@/hooks/useColorScheme';
import { AppTheme } from '@/constants/theme';
import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName?: keyof typeof AppTheme.light
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  if (colorName) {
    return AppTheme[theme][colorName];
  }

  // Fallback? or return undefined?
  // Matching behavior of useColor usually returns something.
  // But based on usage <View style={{ backgroundColor }} /> it might need to return a string.
  return AppTheme[theme].text;
}
