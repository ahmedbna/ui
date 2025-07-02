import { Button, ButtonVariant } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FONT_SIZE } from '@/theme/globals';
import { Share as ShareIcon } from 'lucide-react-native';
import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  Platform,
  Share as RNShare,
  ShareOptions,
  TextStyle,
  View,
} from 'react-native';

export interface ShareContent {
  message?: string;
  url?: string;
  title?: string;
  subject?: string; // For email sharing on iOS
}

export interface ShareButtonOptions {
  dialogTitle?: string; // Android only
  excludedActivityTypes?: string[]; // iOS only
  tintColor?: string; // iOS only
  anchor?: number; // iOS only - for iPad anchoring
}

interface ShareButtonProps {
  content: ShareContent;
  options?: ShareButtonOptions;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onShareStart?: () => void;
  onShareSuccess?: (activityType?: string | null) => void;
  onShareError?: (error: Error) => void;
  onShareDismiss?: () => void;
  showIcon?: boolean;
  iconSize?: number;
  fallbackMessage?: string;
  validateContent?: boolean;
  testID?: string;
}

export function ShareButton({
  content,
  options,
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
  onShareStart,
  onShareSuccess,
  onShareError,
  onShareDismiss,
  showIcon = true,
  iconSize = 18,
  validateContent = true,
}: ShareButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const secondaryForegroundColor = useThemeColor({}, 'secondaryForeground');
  const destructiveForegroundColor = useThemeColor({}, 'destructiveForeground');

  // Validate content requirements
  const isContentValid = useMemo(() => {
    if (!validateContent) return true;

    // At least one of url or message is required
    const hasRequiredContent = Boolean(content.message || content.url);

    // Additional validation
    if (content.url && !isValidUrl(content.url)) {
      return false;
    }

    return hasRequiredContent;
  }, [content, validateContent]);

  const handleShare = useCallback(async () => {
    if (!isContentValid) {
      const error = new Error(
        'Invalid share content: At least one of message or url is required'
      );
      onShareError?.(error);
      Alert.alert('Share Error', 'Cannot share: invalid content provided');
      return;
    }

    try {
      onShareStart?.();

      // Build share content object
      const shareContent: any = {};

      if (content.message) shareContent.message = content.message;
      if (content.url) shareContent.url = content.url;

      // Platform-specific content
      if (Platform.OS === 'ios') {
        if (content.title) shareContent.title = content.title;
        if (content.subject) shareContent.subject = content.subject;
      }

      // Build share options object
      const shareOptions: ShareOptions = {};

      if (options) {
        // Android-specific options
        if (Platform.OS === 'android' && options.dialogTitle) {
          shareOptions.dialogTitle = options.dialogTitle;
        }

        // iOS-specific options
        if (Platform.OS === 'ios') {
          if (options.excludedActivityTypes) {
            shareOptions.excludedActivityTypes = options.excludedActivityTypes;
          }
          if (options.tintColor) {
            shareOptions.tintColor = options.tintColor;
          }
          if (options.anchor) {
            shareOptions.anchor = options.anchor;
          }
        }
      }

      const result = await RNShare.share(shareContent, shareOptions);

      if (result.action === RNShare.sharedAction) {
        onShareSuccess?.(result.activityType);
      } else if (result.action === RNShare.dismissedAction) {
        onShareDismiss?.();
      }
    } catch (error: any) {
      const shareError =
        error instanceof Error ? error : new Error(String(error));
      onShareError?.(shareError);

      // More user-friendly error messages
      const errorMessage = getShareErrorMessage(shareError);
      Alert.alert('Share Error', errorMessage);
    }
  }, [
    content,
    options,
    isContentValid,
    onShareStart,
    onShareSuccess,
    onShareError,
    onShareDismiss,
  ]);

  const isButtonDisabled = disabled || loading || !isContentValid;

  const getButtonTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: FONT_SIZE,
      fontWeight: '500',
    };

    switch (variant) {
      case 'destructive':
        return { ...baseTextStyle, color: destructiveForegroundColor };
      case 'success':
        return { ...baseTextStyle, color: destructiveForegroundColor };
      case 'outline':
        return { ...baseTextStyle, color: primaryColor };
      case 'secondary':
        return { ...baseTextStyle, color: secondaryForegroundColor };
      case 'ghost':
        return { ...baseTextStyle, color: primaryColor };
      case 'link':
        return {
          ...baseTextStyle,
          color: primaryColor,
          textDecorationLine: 'underline',
        };
      default:
        return { ...baseTextStyle, color: primaryForegroundColor };
    }
  };

  // Create button content with proper layout
  const buttonContent = () => {
    if (!showIcon || loading) {
      return children;
    }

    if (!children) {
      return <ShareIcon size={iconSize} color={getButtonTextStyle().color} />;
    }

    // Handle string children properly with correct styling
    const textContent =
      typeof children === 'string' ? (
        <Text style={getButtonTextStyle()}>{children}</Text>
      ) : (
        children
      );

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ShareIcon
          size={iconSize}
          color={getButtonTextStyle().color}
          style={{ marginRight: 8 }}
        />
        {textContent}
      </View>
    );
  };

  return (
    <Button
      onPress={handleShare}
      variant={variant}
      size={size}
      disabled={isButtonDisabled}
      loading={loading}
    >
      {buttonContent()}
    </Button>
  );
}

// Utility function to validate URLs
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    // Try with protocol if missing
    try {
      new URL(`https://${url}`);
      return true;
    } catch {
      return false;
    }
  }
}

// Utility function to provide user-friendly error messages
function getShareErrorMessage(error: Error): string {
  const message = error.message.toLowerCase();

  if (message.includes('cancel') || message.includes('dismiss')) {
    return 'Share was cancelled';
  }
  if (message.includes('network') || message.includes('connection')) {
    return 'Network error occurred while sharing';
  }
  if (message.includes('permission')) {
    return 'Permission denied for sharing';
  }
  if (message.includes('not supported')) {
    return 'Sharing is not supported on this device';
  }

  return 'An error occurred while sharing. Please try again.';
}

// Hook for easier usage with common share scenarios
export function useShare() {
  const shareText = useCallback(
    (text: string, options?: ShareButtonOptions) => {
      return RNShare.share({ message: text }, options);
    },
    []
  );

  const shareUrl = useCallback(
    (url: string, message?: string, options?: ShareButtonOptions) => {
      return RNShare.share({ url, message }, options);
    },
    []
  );

  const shareContent = useCallback(
    (content: ShareContent, options?: ShareButtonOptions) => {
      const shareData: any = {};
      if (content.message) shareData.message = content.message;
      if (content.url) shareData.url = content.url;
      if (Platform.OS === 'ios') {
        if (content.title) shareData.title = content.title;
        if (content.subject) shareData.subject = content.subject;
      }

      return RNShare.share(shareData, options);
    },
    []
  );

  return {
    shareText,
    shareUrl,
    shareContent,
  };
}
