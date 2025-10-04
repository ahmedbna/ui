import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import { CORNERS, FONT_SIZE } from '@/theme/globals';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputKeyPressEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface InputOTPProps
  extends Omit<TextInputProps, 'style' | 'value' | 'onChangeText'> {
  /** Number of OTP digits */
  length?: number;
  /** Current OTP value */
  value?: string;
  /** Called when OTP value changes */
  onChangeText?: (value: string) => void;
  /** Called when OTP is complete */
  onComplete?: (value: string) => void;
  /** Error message to display */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Individual slot style */
  slotStyle?: ViewStyle;
  /** Error style */
  errorStyle?: TextStyle;
  /** Whether to mask the input (show dots instead of numbers) */
  masked?: boolean;
  /** Separator component between slots */
  separator?: React.ReactNode;
  /** Whether to show cursor in active slot */
  showCursor?: boolean;
}

export interface InputOTPRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string;
}

export const InputOTP = forwardRef<InputOTPRef, InputOTPProps>(
  (
    {
      length = 6,
      value = '',
      onChangeText,
      onComplete,
      error,
      disabled = false,
      containerStyle,
      slotStyle,
      errorStyle,
      masked = false,
      separator,
      showCursor = true,
      onFocus,
      onBlur,
      ...textInputProps
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<TextInput>(null);

    // Theme colors
    const cardColor = useColor('card');
    const textColor = useColor('text');
    const muted = useColor('textMuted');
    const borderColor = useColor('border');
    const primary = useColor('primary');
    const danger = useColor('red');
    const background = useColor('background');

    // Normalize value to ensure it doesn't exceed length
    const normalizedValue = value.slice(0, length);

    // Calculate active index based on current value
    const currentActiveIndex = Math.min(normalizedValue.length, length - 1);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => {
        onChangeText?.('');
        setActiveIndex(0);
      },
      getValue: () => normalizedValue,
    }));

    const handleChangeText = useCallback(
      (text: string) => {
        // Only allow numeric input
        const cleanText = text.replace(/[^0-9]/g, '');
        const limitedText = cleanText.slice(0, length);

        onChangeText?.(limitedText);
        setActiveIndex(Math.min(limitedText.length, length - 1));

        // Call onComplete when OTP is fully entered
        if (limitedText.length === length) {
          onComplete?.(limitedText);
        }
      },
      [length, onChangeText, onComplete]
    );

    const handleKeyPress = useCallback(
      (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const { key } = e.nativeEvent;

        if (key === 'Backspace' && normalizedValue.length > 0) {
          const newValue = normalizedValue.slice(0, -1);
          onChangeText?.(newValue);
          setActiveIndex(Math.max(0, newValue.length));
        }
      },
      [normalizedValue, onChangeText]
    );

    const handleFocus = useCallback(
      (e: any) => {
        setIsFocused(true);
        setActiveIndex(normalizedValue.length);
        onFocus?.(e);
      },
      [normalizedValue.length, onFocus]
    );

    const handleBlur = useCallback(
      (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleSlotPress = useCallback(() => {
      if (!disabled) {
        inputRef.current?.focus();
      }
    }, [disabled]);

    // Generate slots
    const slots = Array.from({ length }, (_, index) => {
      const hasValue = index < normalizedValue.length;
      const isActive = isFocused && index === currentActiveIndex;
      const displayValue = hasValue
        ? masked
          ? '•'
          : normalizedValue[index]
        : '';

      return (
        <React.Fragment key={index}>
          <Pressable
            onPress={handleSlotPress}
            disabled={disabled}
            style={[
              {
                width: 58,
                height: 58,
                borderRadius: CORNERS,
                borderWidth: 1,
                borderColor: error
                  ? danger
                  : isActive
                  ? primary
                  : hasValue
                  ? borderColor
                  : borderColor,
                backgroundColor: disabled ? muted + '20' : cardColor,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: disabled ? 0.6 : 1,
              },
              slotStyle,
            ]}
          >
            <Text
              style={{
                fontSize: FONT_SIZE + 2,
                fontWeight: '600',
                color: error ? danger : hasValue ? textColor : muted,
              }}
            >
              {displayValue}
            </Text>

            {/* Cursor */}
            {showCursor && isActive && !hasValue && (
              <View
                style={{
                  position: 'absolute',
                  width: 2,
                  height: 20,
                  backgroundColor: primary,
                  opacity: isFocused ? 1 : 0,
                }}
              />
            )}
          </Pressable>

          {/* Separator */}
          {separator && index < length - 1 && (
            <View style={{ marginHorizontal: 4 }}>{separator}</View>
          )}
        </React.Fragment>
      );
    });

    const renderContent = () => (
      <View style={containerStyle}>
        {/* Hidden TextInput for handling input */}
        <TextInput
          ref={inputRef}
          value={normalizedValue}
          onChangeText={handleChangeText}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType='numeric'
          maxLength={length}
          editable={!disabled}
          selectionColor='transparent'
          style={{
            position: 'absolute',
            left: -9999,
            opacity: 0,
          }}
          {...textInputProps}
        />

        {/* OTP Slots */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: separator ? 0 : 8,
          }}
        >
          {slots}
        </View>

        {/* Error Message */}
        {error && (
          <Text
            style={[
              {
                textAlign: 'center',
                marginTop: 8,
                fontSize: 14,
                color: danger,
              },
              errorStyle,
            ]}
          >
            {error}
          </Text>
        )}
      </View>
    );

    return renderContent();
  }
);

InputOTP.displayName = 'InputOTP';

// Optional: Export a preset with separator
export const InputOTPWithSeparator = forwardRef<
  InputOTPRef,
  Omit<InputOTPProps, 'separator'>
>((props, ref) => (
  <InputOTP
    ref={ref}
    separator={
      <Text style={{ fontSize: 18, color: useColor('textMuted') }}>-</Text>
    }
    {...props}
  />
));

InputOTPWithSeparator.displayName = 'InputOTPWithSeparator';
