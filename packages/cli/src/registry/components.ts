export function generateButtonTemplate(): string {
  return `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  children,
}: ButtonProps) {
  const { theme } = useTheme();

  const buttonStyles = [
    styles.base,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[\`text\${size.charAt(0).toUpperCase() + size.slice(1)}\`],
    styles[\`text\${variant.charAt(0).toUpperCase() + variant.slice(1)}\`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={cn(...buttonStyles)}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {children || <Text style={cn(...textStyles)}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 52,
  },
  primary: {
    backgroundColor: '#0ea5e9',
  },
  secondary: {
    backgroundColor: '#f1f5f9',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
  textPrimary: {
    color: '#ffffff',
  },
  textSecondary: {
    color: '#0f172a',
  },
  textOutline: {
    color: '#0f172a',
  },
  textGhost: {
    color: '#0f172a',
  },
  textDestructive: {
    color: '#ffffff',
  },
  textDisabled: {
    opacity: 0.5,
  },
});
`;
}

export function generateInputTemplate(): string {
  return `import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  required?: boolean;
}

export function Input({
  label,
  error,
  helper,
  containerStyle,
  inputStyle,
  required = false,
  ...props
}: InputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={cn(styles.container, containerStyle)}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <TextInput
        style={cn(
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          inputStyle
        )}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {helper && !error && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#0f172a',
  },
  inputFocused: {
    borderColor: '#0ea5e9',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  error: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  helper: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});
`;
}

export function generateCardTemplate(): string {
  return `import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style, shadow = true }: CardProps) {
  const { theme } = useTheme();

  return (
    <View style={cn(styles.card, shadow && styles.shadow, style)}>
      {children}
    </View>
  );
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={cn(styles.header, style)}>{children}</View>;
}

export function CardTitle({ children, style }: CardTitleProps) {
  return <Text style={cn(styles.title, style)}>{children}</Text>;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  return <Text style={cn(styles.description, style)}>{children}</Text>;
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={cn(styles.content, style)}>{children}</View>;
}

export function CardFooter({ children, style }: CardFooterProps) {
  return <View style={cn(styles.footer, style)}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    padding: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  footer: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
});
`;
}

export function generateModalTemplate(): string {
  return `import React from 'react';
import { Modal, View, Text, StyleSheet, ViewStyle, Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutDown } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  animationType?: 'slide' | 'fade';
}

export function CustomModal({
  visible,
  onClose,
  title,
  children,
  style,
  animationType = 'slide',
}: ModalProps) {
  const { theme } = useTheme();

  const contentAnimation = animationType === 'slide' 
    ? { entering: SlideInUp, exiting: SlideOutDown }
    : { entering: FadeIn, exiting: FadeOut };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={styles.overlay}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View 
          style={cn(styles.modal, style)}
          {...contentAnimation}
        >
          {title && (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 20,
    maxWidth: 400,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  content: {
    padding: 20,
  },
});
`;
}

export function generateAvatarTemplate(): string {
  return `import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface AvatarProps {
  uri?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
}

export function Avatar({ uri, fallback, size = 'md', style }: AvatarProps) {
  const { theme } = useTheme();

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <View style={cn(styles.avatar, styles[size], style)}>
      {uri ? (
        <Image
          source={{ uri }}
          style={styles.image}
          contentFit="cover"
          placeholder={require('../../assets/placeholder-avatar.png')}
        />
      ) : (
        <View style={cn(styles.fallback, styles[size])}>
          <Text style={cn(styles.fallbackText, styles[\`text\${size.charAt(0).toUpperCase() + size.slice(1)}\`])}>
            {getInitials(fallback)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
  },
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 48,
    height: 48,
  },
  xl: {
    width: 64,
    height: 64,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
  },
  fallbackText: {
    fontWeight: '600',
    color: '#64748b',
  },
  textSm: {
    fontSize: 12,
  },
  textMd: {
    fontSize: 14,
  },
  textLg: {
    fontSize: 16,
  },
  textXl: {
    fontSize: 20,
  },
});
`;
}

export function generateBadgeTemplate(): string {
  return `import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  const { theme } = useTheme();

  return (
    <View style={cn(styles.badge, styles[variant], styles[size], style)}>
      <Text style={cn(styles.text, styles[\`text\${variant.charAt(0).toUpperCase() + variant.slice(1)}\`], styles[\`text\${size.charAt(0).toUpperCase() + size.slice(1)}\`], textStyle)}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lg: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  default: {
    backgroundColor: '#f1f5f9',
  },
  success: {
    backgroundColor: '#dcfce7',
  },
  warning: {
    backgroundColor: '#fef3c7',
  },
  error: {
    backgroundColor: '#fee2e2',
  },
  info: {
    backgroundColor: '#dbeafe',
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  textSm: {
    fontSize: 11,
  },
  textMd: {
    fontSize: 12,
  },
  textLg: {
    fontSize: 14,
  },
  textDefault: {
    color: '#64748b',
  },
  textSuccess: {
    color: '#16a34a',
  },
  textWarning: {
    color: '#d97706',
  },
  textError: {
    color: '#dc2626',
  },
  textInfo: {
    color: '#2563eb',
  },
});
`;
}

export function generateSwitchTemplate(): string {
  return `import React, { useState } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Switch({
  value,
  onValueChange,
  disabled = false,
  size = 'md',
  style,
}: SwitchProps) {
  const { theme } = useTheme();
  const translateX = useSharedValue(value ? 1 : 0);

  React.useEffect(() => {
    translateX.value = withSpring(value ? 1 : 0);
  }, [value]);

  const thumbStyle = useAnimatedStyle(() => {
    const thumbSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
    const trackWidth = size === 'sm' ? 36 : size === 'lg' ? 56 : 44;
    const maxTranslate = trackWidth - thumbSize - 4;

    return {
      transform: [{ translateX: translateX.value * maxTranslate }],
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={cn(
        styles.track,
        styles[\`track\${size.charAt(0).toUpperCase() + size.slice(1)}\`],
        value ? styles.trackActive : styles.trackInactive,
        disabled && styles.trackDisabled,
        style
      )}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.thumb,
          styles[\`thumb\${size.charAt(0).toUpperCase() + size.slice(1)}\`],
          thumbStyle,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
  },
  trackSm: {
    width: 36,
    height: 20,
  },
  trackMd: {
    width: 44,
    height: 24,
  },
  trackLg: {
    width: 56,
    height: 32,
  },
  trackActive: {
    backgroundColor: '#0ea5e9',
  },
  trackInactive: {
    backgroundColor: '#e2e8f0',
  },
  trackDisabled: {
    opacity: 0.5,
  },
  thumb: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbSm: {
    width: 16,
    height: 16,
  },
  thumbMd: {
    width: 20,
    height: 20,
  },
  thumbLg: {
    width: 24,
    height: 24,
  },
});
`;
}

export function generateSpinnerTemplate(): string {
  return `import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  Easing 
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  style?: ViewStyle;
}

export function Spinner({ size = 'md', color, style }: SpinnerProps) {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: \`\${rotation.value}deg\` }],
    };
  });

  const spinnerColor = color || theme?.colors?.primary || '#0ea5e9';

  return (
    <View style={cn(styles.container, style)}>
      <Animated.View
        style={[
          styles.spinner,
          styles[size],
          { borderTopColor: spinnerColor },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 50,
  },
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 24,
    height: 24,
  },
  lg: {
    width: 32,
    height: 32,
  },
});
`;
}

export function generateToastTemplate(): string {
  return `import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay,
  runOnJS 
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Toast({
  message,
  type = 'info',
  duration = 3000,
  onHide,
  style,
  textStyle,
}: ToastProps) {
  const { theme } = useTheme();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate in
    translateY.value = withSpring(0);
    opacity.value = withSpring(1);

    // Auto hide
    if (duration > 0) {
      translateY.value = withDelay(
        duration,
        withSpring(-100, undefined, () => {
          if (onHide) {
            runOnJS(onHide)();
          }
        })
      );
      opacity.value = withDelay(duration, withSpring(0));
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.toast,
        styles[type],
        animatedStyle,
        style,
      ]}
    >
      <Text style={cn(styles.text, styles[\`text\${type.charAt(0).toUpperCase() + type.slice(1)}\`], textStyle)}>
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  success: {
    backgroundColor: '#dcfce7',
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  error: {
    backgroundColor: '#fee2e2',
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
  },
  warning: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#d97706',
  },
  info: {
    backgroundColor: '#dbeafe',
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  textSuccess: {
    color: '#16a34a',
  },
  textError: {
    color: '#dc2626',
  },
  textWarning: {
    color: '#d97706',
  },
  textInfo: {
    color: '#2563eb',
  },
});
`;
}

export function generateCheckboxTemplate(): string {
  return `import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Checkbox({
  checked,
  onCheckedChange,
  disabled = false,
  size = 'md',
  style,
}: CheckboxProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    scale.value = withSpring(checked ? 1 : 0);
  }, [checked]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;

  return (
    <Pressable
      onPress={handlePress}
      style={cn(
        styles.checkbox,
        styles[size],
        checked ? styles.checked : styles.unchecked,
        disabled && styles.disabled,
        style
      )}
      disabled={disabled}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name="checkmark"
          size={iconSize}
          color="#ffffff"
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    width: 16,
    height: 16,
  },
  md: {
    width: 20,
    height: 20,
  },
  lg: {
    width: 24,
    height: 24,
  },
  checked: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  unchecked: {
    backgroundColor: 'transparent',
    borderColor: '#e2e8f0',
  },
  disabled: {
    opacity: 0.5,
  },
});
`;
}
