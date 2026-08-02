import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { FONT_SIZE } from '@/theme/globals';
import { ImageProps, ImageSource } from 'expo-image';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

type AvatarImageStatus = 'loading' | 'loaded' | 'error';

interface AvatarContextValue {
  status: AvatarImageStatus;
  setStatus: Dispatch<SetStateAction<AvatarImageStatus>>;
}

// Connects AvatarImage's load state to AvatarFallback so the fallback shows
// automatically on error (or while there's no image at all) and hides once
// the image has actually loaded, instead of being rendered unconditionally
// by whatever the consumer puts in JSX.
const AvatarContext = createContext<AvatarContextValue | null>(null);

const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('Avatar subcomponents must be used within an Avatar');
  }
  return context;
};

interface AvatarProps {
  children: React.ReactNode;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({ children, size = 40, style }: AvatarProps) {
  const [status, setStatus] = useState<AvatarImageStatus>('loading');

  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
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
    </AvatarContext.Provider>
  );
}

interface AvatarImageProps {
  source: ImageSource;
  style?: ImageProps['style'];
}

export function AvatarImage({ source, style }: AvatarImageProps) {
  const { setStatus } = useAvatarContext();

  return (
    <Image
      source={source}
      style={[style]}
      accessibilityRole='image'
      onLoadStart={() => setStatus('loading')}
      onError={() => setStatus('error')}
      onLoadEnd={() =>
        setStatus((prev) => (prev === 'error' ? 'error' : 'loaded'))
      }
    />
  );
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
  const { status } = useAvatarContext();
  const mutedColor = useColor('muted');
  const mutedForegroundColor = useColor('mutedForeground');

  if (status === 'loaded') return null;

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
