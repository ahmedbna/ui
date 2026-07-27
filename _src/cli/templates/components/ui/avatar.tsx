import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { FONT_SIZE } from '@/theme/globals';
import { ImageProps, ImageSource } from 'expo-image';
import { TextStyle, ViewStyle } from 'react-native';

interface AvatarProps {
  children: React.ReactNode;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({ children, size = 40, style }: AvatarProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
          position: 'relative',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface AvatarImageProps {
  source: ImageSource;
  style?: ImageProps['style'];
}

export function AvatarImage({ source, style }: AvatarImageProps) {
  return <Image source={source} style={[style]} />;
}

interface AvatarFallbackProps {
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function AvatarFallback({
  children,
  style,
  textStyle,
}: AvatarFallbackProps) {
  const mutedColor = useColor('muted');
  const mutedForegroundColor = useColor('mutedForeground');

  return (
    <View
      style={[
        {
          width: '100%',
          height: '100%',
          backgroundColor: mutedColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: mutedForegroundColor,
            fontSize: FONT_SIZE,
            fontWeight: '500',
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}
