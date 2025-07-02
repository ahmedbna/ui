import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React from 'react';
import { Alert as RNAlert, TextStyle, ViewStyle } from 'react-native';

type AlertVariant = 'default' | 'destructive';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  style?: ViewStyle;
}

// Visual Alert Component (existing functionality)
export function Alert({ children, variant = 'default', style }: AlertProps) {
  const borderColor = useThemeColor({}, 'border');
  const destructiveColor = useThemeColor({}, 'destructive');
  const backgroundColor = useThemeColor({}, 'card');

  return (
    <View
      style={[
        {
          padding: BORDER_RADIUS,
          borderRadius: BORDER_RADIUS,
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderColor:
            variant === 'destructive' ? destructiveColor : borderColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface AlertTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function AlertTitle({ children, style }: AlertTitleProps) {
  return (
    <Text variant='title' style={[style]}>
      {children}
    </Text>
  );
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  return (
    <Text
      variant='caption'
      style={[
        {
          marginTop: 8,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// Native Alert Functions
interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface NativeAlertOptions {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  cancelable?: boolean;
}

// Two-button native alert
export const createTwoButtonAlert = (options: NativeAlertOptions) => {
  const { title, message, buttons } = options;

  const defaultButtons: AlertButton[] = [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => console.log('OK Pressed'),
    },
  ];

  RNAlert.alert(title, message, buttons || defaultButtons);
};

// Three-button native alert
export const createThreeButtonAlert = (options: NativeAlertOptions) => {
  const { title, message, buttons } = options;

  const defaultButtons: AlertButton[] = [
    {
      text: 'Ask me later',
      onPress: () => console.log('Ask me later pressed'),
    },
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => console.log('OK Pressed'),
    },
  ];

  RNAlert.alert(title, message, buttons || defaultButtons);
};

// Generic native alert function
export const showNativeAlert = (options: NativeAlertOptions) => {
  const { title, message, buttons, cancelable = true } = options;

  if (!buttons || buttons.length === 0) {
    // Simple alert with just OK button
    RNAlert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
  } else {
    RNAlert.alert(title, message, buttons, { cancelable });
  }
};

// Convenience functions for common alert types
export const showSuccessAlert = (
  title: string,
  message?: string,
  onOk?: () => void
) => {
  showNativeAlert({
    title,
    message,
    buttons: [
      {
        text: 'OK',
        onPress: onOk || (() => console.log('Success acknowledged')),
      },
    ],
  });
};

export const showErrorAlert = (
  title: string,
  message?: string,
  onOk?: () => void
) => {
  showNativeAlert({
    title,
    message,
    buttons: [
      {
        text: 'OK',
        onPress: onOk || (() => console.log('Error acknowledged')),
        style: 'destructive',
      },
    ],
  });
};

export const showConfirmAlert = (
  title: string,
  message?: string,
  onConfirm?: () => void,
  onCancel?: () => void
) => {
  showNativeAlert({
    title,
    message,
    buttons: [
      {
        text: 'Cancel',
        onPress: onCancel || (() => console.log('Cancelled')),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: onConfirm || (() => console.log('Confirmed')),
      },
    ],
  });
};

// Export the React Native Alert for direct use
export { RNAlert as NativeAlert };
