// components/ui/blur-background.tsx
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

export function useBottomTabOverflow() {
  return Platform.OS === 'ios' ? useBottomTabBarHeight() : 0;
}
