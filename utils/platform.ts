// utils/platform.ts
import { Platform } from 'react-native';

export interface PlatformInfo {
  isExpo: boolean;
  isBareRN: boolean;
  isWeb: boolean;
  isNative: boolean;
  hasNavigation: boolean;
}

/**
 * Comprehensive platform detection for React Native environments
 */
export const detectPlatform = (): PlatformInfo => {
  const isWeb = Platform.OS === 'web';
  const isNative = !isWeb;

  // Check for Expo environment
  const isExpo = (() => {
    try {
      // Check for Expo global
      // if (typeof global !== 'undefined' && global.__expo) {
      //   return true;
      // }

      // Check for Expo in window (web)
      if (typeof window !== 'undefined' && (window as any).expo) {
        return true;
      }

      // Check for Expo Constants
      try {
        require('expo-constants');
        return true;
      } catch {
        // Expo Constants not found
      }

      // Check for Expo modules in package.json context
      if (
        typeof process !== 'undefined' &&
        process.env?.EXPO_PUBLIC_PROJECT_ROOT
      ) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  })();

  const isBareRN = !isExpo;

  // Check if React Navigation is available
  const hasNavigation = (() => {
    try {
      require('@react-navigation/native');
      return true;
    } catch {
      return false;
    }
  })();

  return {
    isExpo,
    isBareRN,
    isWeb,
    isNative,
    hasNavigation,
  };
};

// Singleton instance for performance
let platformInfo: PlatformInfo | null = null;

export const getPlatform = (): PlatformInfo => {
  if (!platformInfo) {
    platformInfo = detectPlatform();
  }
  return platformInfo;
};

// Individual utility functions for cleaner usage
export const isExpoEnvironment = (): boolean => getPlatform().isExpo;
export const isBareReactNative = (): boolean => getPlatform().isBareRN;
export const isWebEnvironment = (): boolean => getPlatform().isWeb;
export const isNativeEnvironment = (): boolean => getPlatform().isNative;
export const hasReactNavigation = (): boolean => getPlatform().hasNavigation;

// Debug function to log platform information
export const logPlatformInfo = (): void => {
  const platform = getPlatform();
  console.log('🔍 Platform Detection Results:', {
    ...platform,
    OS: Platform.OS,
    Version: Platform.Version,
  });
};
