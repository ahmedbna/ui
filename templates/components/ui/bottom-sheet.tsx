import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
  enableBackdropDismiss?: boolean;
  title?: string;
  style?: ViewStyle;
};

export function BottomSheet({
  isVisible,
  onClose,
  children,
  snapPoints = [0.3, 0.6, 0.9],
  enableBackdropDismiss = true,
  title,
  style,
}: BottomSheetProps) {
  const cardColor = useThemeColor({}, 'card');
  const mutedColor = useThemeColor({}, 'muted');

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const opacity = useSharedValue(0);

  // Convert snap points to actual heights
  const snapPointsHeights = snapPoints.map((point) => -SCREEN_HEIGHT * point);
  const defaultHeight = snapPointsHeights[0];

  // Delayed modal close to allow animation to complete
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      translateY.value = withSpring(defaultHeight, {
        damping: 50,
        stiffness: 400,
      });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      // Animate slide down before closing modal
      translateY.value = withSpring(0, {
        damping: 50,
        stiffness: 400,
      });
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setModalVisible)(false);
        }
      });
    }
  }, [isVisible, defaultHeight]);

  const scrollTo = (destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {
      damping: 50,
      stiffness: 400,
    });
  };

  const findClosestSnapPoint = (currentY: number) => {
    'worklet';
    let closest = snapPointsHeights[0];
    let minDistance = Math.abs(currentY - closest);

    for (const snapPoint of snapPointsHeights) {
      const distance = Math.abs(currentY - snapPoint);
      if (distance < minDistance) {
        minDistance = distance;
        closest = snapPoint;
      }
    }

    return closest;
  };

  const animateClose = () => {
    'worklet';
    // Animate to slide down position
    translateY.value = withSpring(0, {
      damping: 50,
      stiffness: 400,
    });
    opacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const newY = context.value.y + event.translationY;
      // Limit the dragging range
      if (newY <= 0 && newY >= MAX_TRANSLATE_Y) {
        translateY.value = newY;
      }
    })
    .onEnd((event) => {
      const currentY = translateY.value;
      const velocity = event.velocityY;

      // If dragging down with significant velocity, close the sheet
      if (velocity > 500 && currentY > -SCREEN_HEIGHT * 0.2) {
        animateClose();
        return;
      }

      // Find the closest snap point
      const closestSnapPoint = findClosestSnapPoint(currentY);
      scrollTo(closestSnapPoint);
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleBackdropPress = () => {
    if (enableBackdropDismiss) {
      // Use animated close instead of direct onClose
      animateClose();
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      statusBarTranslucent
      animationType='none'
      style={{ backgroundColor: cardColor }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            rBackdropStyle,
          ]}
        >
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Animated.View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          <GestureDetector gesture={gesture}>
            <Animated.View
              style={[
                {
                  height: SCREEN_HEIGHT,
                  width: '100%',
                  position: 'absolute',
                  top: SCREEN_HEIGHT,
                  backgroundColor: cardColor,
                  borderTopLeftRadius: BORDER_RADIUS,
                  borderTopRightRadius: BORDER_RADIUS,
                },
                rBottomSheetStyle,
                style,
              ]}
            >
              {/* Handle */}
              <View
                style={{
                  width: 64,
                  height: 6,
                  backgroundColor: mutedColor,
                  alignSelf: 'center',
                  marginTop: 8,
                  borderRadius: 999,
                }}
              />

              {/* Title */}
              {title && (
                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 16,
                    paddingBottom: 8,
                  }}
                >
                  <Text variant='title' style={{ textAlign: 'center' }}>
                    {title}
                  </Text>
                </View>
              )}

              {/* Content */}
              <View style={{ flex: 1, padding: 16 }}>{children}</View>
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

// Hook for managing bottom sheet state
export function useBottomSheet() {
  const [isVisible, setIsVisible] = React.useState(false);

  const open = React.useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = React.useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggle = React.useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return {
    isVisible,
    open,
    close,
    toggle,
  };
}
