import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS, CORNERS } from '@/theme/globals';
import {
  Image as ExpoImage,
  ImageProps as ExpoImageProps,
  ImageSource,
} from 'expo-image';
import { forwardRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

export interface ImageProps extends Omit<ExpoImageProps, 'style'> {
  variant?: 'rounded' | 'circle' | 'default';
  source: ImageSource;
  style?: ExpoImageProps['style'];
  containerStyle?: any;
  showLoadingIndicator?: boolean;
  showErrorFallback?: boolean;
  errorFallbackText?: string;
  loadingIndicatorSize?: 'small' | 'large';
  loadingIndicatorColor?: string;
  aspectRatio?: number;
  width?: number | string;
  height?: number | string;
}

export const Image = forwardRef<ExpoImage, ImageProps>(
  (
    {
      variant = 'rounded',
      source,
      style,
      containerStyle,
      showLoadingIndicator = true,
      showErrorFallback = true,
      errorFallbackText = 'Failed to load image',
      loadingIndicatorSize = 'small',
      loadingIndicatorColor,
      aspectRatio,
      width,
      height,
      contentFit = 'cover',
      transition = 200,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Theme colors
    const backgroundColor = useColor('muted');
    const textColor = useColor('mutedForeground');
    const primaryColor = useColor('primary');

    // Get border radius based on variant
    const getBorderRadius = () => {
      switch (variant) {
        case 'circle':
          return CORNERS;
        case 'rounded':
          return BORDER_RADIUS;
        case 'default':
          return 0;
        default:
          return BORDER_RADIUS;
      }
    };

    const borderRadius = getBorderRadius();

    // Container dimensions - fill container by default, or use provided dimensions
    const containerDimensions =
      width || height || aspectRatio
        ? {
            ...(width ? { width } : {}),
            ...(height ? { height } : {}),
            ...(aspectRatio ? { aspectRatio } : {}),
          }
        : { width: '100%', height: '100%' };

    // Image styles - always fill the container
    const imageStyles = [
      { width: '100%', height: '100%', borderRadius },
      style,
    ].filter(Boolean) as ExpoImageProps['style'];

    const containerStyles = [
      styles.container,
      containerDimensions,
      { borderRadius, backgroundColor },
      containerStyle,
    ];

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleLoadEnd = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    return (
      <View style={containerStyles}>
        <ExpoImage
          ref={ref}
          source={source}
          style={imageStyles}
          contentFit={contentFit}
          transition={transition}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          {...props}
        />

        {/* Loading indicator */}
        {isLoading && showLoadingIndicator && (
          <View style={styles.overlay}>
            <ActivityIndicator
              size={loadingIndicatorSize}
              color={loadingIndicatorColor || primaryColor}
            />
          </View>
        )}

        {/* Error fallback */}
        {hasError && showErrorFallback && (
          <View style={[styles.overlay, styles.errorContainer]}>
            <Text
              variant='caption'
              style={[styles.errorText, { color: textColor }]}
              numberOfLines={2}
            >
              {errorFallbackText}
            </Text>
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 8,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

Image.displayName = 'Image';
