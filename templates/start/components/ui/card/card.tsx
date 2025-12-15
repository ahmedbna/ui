import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, SPACING } from '@/constants/designTokens';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export type CardVariant = 'bordered' | 'plain';
export type CardShadow = 'none' | 'light' | 'medium' | 'large';
export type CardColor = 'white' | 'black' | 'transparent'; // Simplified

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  shadow?: CardShadow;
  color?: CardColor;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Card({
  children,
  variant = 'bordered',
  shadow = 'none',
  color = 'white', // This might need mapping to theme if not handled carefully
  onPress,
  style,
}: CardProps) {
  const themeCardColor = useThemeColor({}, 'card');
  const themeBorderColor = useThemeColor({}, 'border');
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.99);
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getBackgroundColor = () => {
    if (color === 'transparent') return 'transparent';
    if (color === 'white' || color === 'black') {
       // if user explicitly sets white/black, use it
       // but typically we want theme awareness.
       // The user prompt says: "white": Light theme (default)... Adjusted for dark mode.
       // So 'white' likely maps to 'card' color in theme.
       return themeCardColor;
    }
    return themeCardColor;
  };

  const getShadowStyle = (): ViewStyle => {
    if (shadow === 'none') return {};

    const shadowColor = '#000';
    // Simplified shadow logic for RN
    switch (shadow) {
      case 'light':
        return {
          shadowColor,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        };
      case 'medium':
        return {
          shadowColor,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        };
      case 'large':
        return {
          shadowColor,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 8,
        };
      default:
        return {};
    }
  };

  const containerStyle = [
    styles.card,
    {
      backgroundColor: getBackgroundColor(),
      borderRadius: BORDER_RADIUS.MD,
    },
    variant === 'bordered' && {
      borderWidth: 1,
      borderColor: themeBorderColor,
    },
    getShadowStyle(),
    style,
  ];

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[containerStyle, animatedStyle]}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.MD,
    overflow: 'hidden', // might clip shadows on Android if elevation used without background
    // but usually needed for borderRadius with children image
  },
});
