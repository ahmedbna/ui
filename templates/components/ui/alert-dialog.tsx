import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useThemeColor} from '@/hooks/useThemeColor';
import React, {useEffect} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

export type DialogProps = {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  dismissible?: boolean;
  style?: ViewStyle;
};

// A simple card-like dialog overlay with fade-in animation similar to BottomSheet's backdrop
export function Dialog({
                         isVisible,
                         onClose,
                         title,
                         description,
                         children,
                         confirmText = 'OK',
                         cancelText = 'Cancel',
                         onConfirm,
                         onCancel,
                         dismissible = true,
                         style,
                       }: DialogProps) {
  const cardColor = useThemeColor({}, 'card');

  const [modalVisible, setModalVisible] = React.useState(false);
  const backdropOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      backdropOpacity.value = withTiming(1, {duration: 250});
      cardOpacity.value = withTiming(1, {duration: 200});
    } else {
      backdropOpacity.value = withTiming(0, {duration: 250}, (finished) => {
        if (finished) {
          runOnJS(setModalVisible)(false);
        }
      });
      cardOpacity.value = withTiming(0, {duration: 200});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const rBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const rCardFadeStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
  }));

  const animateClose = () => {
    'worklet';
    backdropOpacity.value = withTiming(0, {duration: 300}, (finished) => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
    cardOpacity.value = withTiming(0, {duration: 200});
  };

  const handleBackdropPress = () => {
    if (dismissible) {
      animateClose();
      if (onCancel) onCancel();
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    animateClose();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    animateClose();
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      statusBarTranslucent
      animationType='none'
    >
      <Animated.View
        style={[
          styles.backdrop,
          rBackdropStyle,
        ]}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View style={styles.backdropTouchableArea}/>
        </TouchableWithoutFeedback>

        {/* Non-animated outer wrapper: handles rounded corners and clipping */}
        <View
          style={[
            styles.roundedWrapper,
            {backgroundColor: cardColor},
            style,
          ]}
        >
          {/* Only fade the inner content */}
          <Animated.View style={[styles.innerContent, rCardFadeStyle]}>
            <Card
              // Card has no rounded corners, background or shadow (delegated to wrapper)
              style={{backgroundColor: 'transparent', elevation: 0}}
            >
              {(title || description) && (
                <CardHeader>
                  {title ? <CardTitle>{title}</CardTitle> : null}
                  {description ? <CardDescription>{description}</CardDescription> : null}
                </CardHeader>
              )}
              {children ? <CardContent>{children}</CardContent> : null}
              <CardFooter>
                <Button variant='outline' onPress={handleCancel}>
                  {cancelText}
                </Button>
                <Button style={{flex: 1}} onPress={handleConfirm}>
                  {confirmText}
                </Button>
              </CardFooter>
            </Card>
          </Animated.View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  backdropTouchableArea: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  },
  // Rounded corners and clipping consolidated here (non-animated)
  roundedWrapper: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  // Inner content can render freely (only opacity is animated)
  innerContent: {
    width: '100%',
  },
});

export function useDialog() {
  const [isVisible, setIsVisible] = React.useState(false);
  const open = React.useCallback(() => setIsVisible(true), []);
  const close = React.useCallback(() => setIsVisible(false), []);
  const toggle = React.useCallback(() => setIsVisible((v) => !v), []);
  return {isVisible, open, close, toggle};
}