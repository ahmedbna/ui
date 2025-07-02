import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS } from '@/theme/globals';
import { TextStyle, ViewStyle } from 'react-native';

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = 'default',
  style,
  textStyle,
}: BadgeProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryColor = useThemeColor({}, 'secondary');
  const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');
  const destructiveColor = useThemeColor({}, 'destructive');
  const destructiveForegroundColor = useThemeColor({}, 'destructiveForeground');
  const borderColor = useThemeColor({}, 'border');
  const successColor = useThemeColor({}, 'green');

  const getBadgeStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: CORNERS,
    };

    switch (variant) {
      case 'secondary':
        return { ...baseStyle, backgroundColor: secondaryColor };
      case 'destructive':
        return { ...baseStyle, backgroundColor: destructiveColor };
      case 'success':
        return { ...baseStyle, backgroundColor: successColor };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor,
        };
      default:
        return { ...baseStyle, backgroundColor: primaryColor };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
    };

    switch (variant) {
      case 'secondary':
        return { ...baseTextStyle, color: secondaryForegroundColor };
      case 'destructive':
        return { ...baseTextStyle, color: destructiveForegroundColor };
      case 'outline':
        return { ...baseTextStyle, color: primaryColor };
      default:
        return { ...baseTextStyle, color: primaryForegroundColor };
    }
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{children}</Text>
    </View>
  );
}
