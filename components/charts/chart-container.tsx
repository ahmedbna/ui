import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { ViewStyle } from 'react-native';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  style?: ViewStyle;
};

export const ChartContainer = ({
  title,
  description,
  children,
  style,
}: Props) => {
  const cardColor = useThemeColor({}, 'card');

  return (
    <View
      style={[
        {
          backgroundColor: cardColor,
          borderRadius: BORDER_RADIUS,
          padding: 16,
          width: '100%', // Full container width
        },
        style,
      ]}
    >
      {title && (
        <Text variant='subtitle' style={{ marginBottom: 4 }}>
          {title}
        </Text>
      )}
      {description && (
        <Text variant='caption' style={{ marginBottom: 16 }}>
          {description}
        </Text>
      )}
      {children}
    </View>
  );
};
