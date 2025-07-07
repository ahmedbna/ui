import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS, FONT_SIZE } from '@/theme/globals';
import React, { useEffect, useRef } from 'react';
import {
  ActionSheetIOS,
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface ActionSheetOption {
  title: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelButtonTitle?: string;
  style?: ViewStyle;
}

export function ActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelButtonTitle = 'Cancel',
  style,
}: ActionSheetProps) {
  // Use iOS native ActionSheet on iOS
  if (Platform.OS === 'ios') {
    useEffect(() => {
      if (visible) {
        const optionTitles = options.map((option) => option.title);
        const destructiveButtonIndex = options.findIndex(
          (option) => option.destructive
        );
        const disabledButtonIndices = options
          .map((option, index) => (option.disabled ? index : -1))
          .filter((index) => index !== -1);

        ActionSheetIOS.showActionSheetWithOptions(
          {
            title,
            message,
            options: [...optionTitles, cancelButtonTitle],
            cancelButtonIndex: optionTitles.length,
            destructiveButtonIndex:
              destructiveButtonIndex !== -1
                ? destructiveButtonIndex
                : undefined,
            disabledButtonIndices:
              disabledButtonIndices.length > 0
                ? disabledButtonIndices
                : undefined,
          },
          (buttonIndex) => {
            if (buttonIndex < optionTitles.length) {
              options[buttonIndex].onPress();
            }
            onClose();
          }
        );
      }
    }, [visible, title, message, options, cancelButtonTitle, onClose]);

    // Return null for iOS as we use the native ActionSheet
    return null;
  }

  // Custom implementation for Android and other platforms
  return (
    <AndroidActionSheet
      {...{
        visible,
        onClose,
        title,
        message,
        options,
        cancelButtonTitle,
        style,
      }}
    />
  );
}

// Custom ActionSheet implementation for Android
function AndroidActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelButtonTitle,
  style,
}: ActionSheetProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const borderColor = useThemeColor({}, 'border');
  const destructiveColor = useThemeColor({}, 'red');

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, backgroundOpacity]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, 0],
  });

  const handleOptionPress = (option: ActionSheetOption) => {
    if (!option.disabled) {
      option.onPress();
      onClose();
    }
  };

  const handleBackdropPress = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType='none'
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backgroundOpacity,
            },
          ]}
        >
          <Pressable
            style={styles.backdropPressable}
            onPress={handleBackdropPress}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: cardColor,
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          {/* Header */}
          {(title || message) && (
            <View style={styles.header}>
              {title && (
                <Text
                  style={[
                    styles.title,
                    {
                      color: textColor,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {title}
                </Text>
              )}
              {message && (
                <Text
                  style={[
                    styles.message,
                    {
                      color: mutedColor,
                    },
                  ]}
                  numberOfLines={3}
                >
                  {message}
                </Text>
              )}
            </View>
          )}

          {/* Options */}
          <ScrollView
            style={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  {
                    borderBottomColor: borderColor,
                  },
                  index === options.length - 1 && styles.lastOption,
                  option.disabled && styles.disabledOption,
                ]}
                onPress={() => handleOptionPress(option)}
                disabled={option.disabled}
                activeOpacity={0.6}
              >
                <View style={styles.optionContent}>
                  {option.icon && (
                    <View style={styles.optionIcon}>{option.icon}</View>
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: option.destructive
                          ? destructiveColor
                          : option.disabled
                          ? mutedColor
                          : textColor,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {option.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Cancel Button */}
          <View
            style={[
              styles.cancelContainer,
              {
                borderTopColor: borderColor,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.6}
            >
              <Text
                style={[
                  styles.cancelText,
                  {
                    color: textColor,
                  },
                ]}
              >
                {cancelButtonTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: CORNERS,
    borderTopRightRadius: CORNERS,
    paddingBottom: 34, // Safe area bottom padding
    maxHeight: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  message: {
    fontSize: FONT_SIZE - 1,
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsContainer: {
    maxHeight: 300,
  },
  option: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: FONT_SIZE,
    fontWeight: '500',
    flex: 1,
  },
  cancelContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: FONT_SIZE,
    fontWeight: '600',
  },
});

// Hook for easier ActionSheet usage
export function useActionSheet() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [config, setConfig] = React.useState<
    Omit<ActionSheetProps, 'visible' | 'onClose'>
  >({
    options: [],
  });

  const show = React.useCallback(
    (actionSheetConfig: Omit<ActionSheetProps, 'visible' | 'onClose'>) => {
      setConfig(actionSheetConfig);
      setIsVisible(true);
    },
    []
  );

  const hide = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  const ActionSheetComponent = React.useMemo(
    () => <ActionSheet visible={isVisible} onClose={hide} {...config} />,
    [isVisible, hide, config]
  );

  return {
    show,
    hide,
    ActionSheet: ActionSheetComponent,
    isVisible,
  };
}
