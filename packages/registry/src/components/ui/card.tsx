import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { memo } from 'react';
import {
  TextProps as RNTextProps,
  TextStyle,
  ViewProps as RNViewProps,
  ViewStyle,
} from 'react-native';

interface CardProps extends RNViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card = memo(function Card({
  children,
  style,
  ...props
}: CardProps) {
  const cardColor = useColor('card');
  const foregroundColor = useColor('foreground');

  return (
    <View
      style={[
        {
          width: '100%',
          backgroundColor: cardColor,
          borderRadius: BORDER_RADIUS,
          padding: 18,
          shadowColor: foregroundColor,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});

interface CardHeaderProps extends RNViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardHeader = memo(function CardHeader({
  children,
  style,
  ...props
}: CardHeaderProps) {
  return (
    <View style={[{ marginBottom: 8 }, style]} {...props}>
      {children}
    </View>
  );
});

interface CardTitleProps extends RNTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const CardTitle = memo(function CardTitle({
  children,
  style,
  ...props
}: CardTitleProps) {
  return (
    <Text
      variant='title'
      style={[
        {
          marginBottom: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
});

interface CardDescriptionProps extends RNTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const CardDescription = memo(function CardDescription({
  children,
  style,
  ...props
}: CardDescriptionProps) {
  return (
    <Text variant='caption' style={[style]} {...props}>
      {children}
    </Text>
  );
});

interface CardContentProps extends RNViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardContent = memo(function CardContent({
  children,
  style,
  ...props
}: CardContentProps) {
  return (
    <View style={[style]} {...props}>
      {children}
    </View>
  );
});

interface CardFooterProps extends RNViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardFooter = memo(function CardFooter({
  children,
  style,
  ...props
}: CardFooterProps) {
  return (
    <View
      style={[
        {
          marginTop: 16,
          flexDirection: 'row',
          gap: 8,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
});
