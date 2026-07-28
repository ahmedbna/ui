import { BottomTabBarHeightContext } from 'expo-router/js-tabs';
import { useContext } from 'react';
import { Platform } from 'react-native';

// Reads the tab bar height off its context rather than calling
// `useBottomTabBarHeight()`, for two reasons: the hook must run
// unconditionally to satisfy the rules of hooks (the React Compiler is strict
// about this), and the context returns `undefined` outside a tab navigator
// where the hook would throw. Only iOS needs the inset — Android's tab bar is
// opaque, so content is never underneath it.
export function useBottomTabOverflow() {
  const tabBarHeight = useContext(BottomTabBarHeightContext);
  return Platform.OS === 'ios' ? (tabBarHeight ?? 0) : 0;
}
