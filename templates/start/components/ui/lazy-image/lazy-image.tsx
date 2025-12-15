import React, { useState } from 'react';
import { Image as ExpoImage, ImageProps as ExpoImageProps } from 'expo-image';
import { View, StyleSheet, ActivityIndicator, StyleProp, ImageStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ImageStrategy = 'immediate' | 'lazy' | 'on-scroll' | 'on-viewport';
export type ImagePlaceholder = 'blur' | 'skeleton' | 'color' | 'none';

export interface LazyImageProps extends ExpoImageProps {
  strategy?: ImageStrategy;
  placeholderType?: ImagePlaceholder;
  threshold?: number;
  fallbackSource?: ExpoImageProps['source'];
  cachePolicy?: 'memory' | 'disk' | 'memory-disk' | 'none';
  style?: StyleProp<ImageStyle>;
}

export function LazyImage({
  source,
  strategy = 'lazy',
  placeholderType = 'blur',
  threshold = 100,
  fallbackSource,
  cachePolicy = 'memory-disk',
  style,
  contentFit = 'cover',
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const themePlaceholderColor = useThemeColor({}, 'muted'); // Just a guess for color placeholder

  // expo-image handles caching and lazy loading natively to some extent via `recyclingKey` or just nature of component
  // 'strategy' logic might need custom implementation if expo-image doesn't support "on-scroll" explicitly this way
  // but for now we map what we can.
  // expo-image usually loads immediately when mounted unless we control source.

  // NOTE: Simple wrapper for now.

  const handleLoad = (e: any) => {
    setLoading(false);
    onLoad?.(e);
  };

  const handleError = (e: any) => {
    setLoading(false);
    setHasError(true);
    onError?.(e);
  };

  const finalSource = hasError && fallbackSource ? fallbackSource : source;

  return (
    <View style={[styles.container, style]}>
      {placeholderType === 'skeleton' && loading && (
         <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.zinc[200] }]}>
           {/* Simple skeleton */}
           <ActivityIndicator color={Colors.zinc[400]} style={styles.loader} />
         </View>
      )}

      <ExpoImage
        source={finalSource}
        style={[StyleSheet.absoluteFill]} // Fill container
        contentFit={contentFit}
        cachePolicy={cachePolicy}
        onLoad={handleLoad}
        onError={handleError}
        placeholder={placeholderType === 'blur' ? props.placeholder : undefined}
        transition={200}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
  },
});
