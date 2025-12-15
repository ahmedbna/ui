import { useColorScheme } from '@/hooks/useColorScheme';
import { AppTheme } from '@/constants/theme';

export function useAccentColor() {
  const theme = useColorScheme() ?? 'light';

  const getBackgroundColor = () => {
    return AppTheme[theme].tint;
  };

  return { getBackgroundColor };
}
