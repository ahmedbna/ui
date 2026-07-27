import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useKeyboardHeight } from '@/hooks/useKeyboardHeight'; // Make sure this path is correct
import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
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

type BottomSheetContentProps = {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
  rBottomSheetStyle: any;
  cardColor: string;
  mutedColor: string;
  onHandlePress?: () => void;
};

// Component for the bottom sheet content
// It now includes a ScrollView by default for better form handling.
const BottomSheetContent = ({
  children,
  title,
  style,
  rBottomSheetStyle,
  cardColor,
  mutedColor,
  onHandlePress,
}: BottomSheetContentProps) => {
  return (
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
      <TouchableWithoutFeedback onPress={onHandlePress}>
        <View
          style={{
            width: '100%',
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 64,
              height: 6,
              backgroundColor: mutedColor,
              borderRadius: 999,
            }}
          />
        </View>
      </TouchableWithoutFeedback>

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

      {/* Content now wrapped in a ScrollView */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
};

type BottomSheetProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
  enableBackdropDismiss?: boolean;
  title?: string;
  style?: ViewStyle;
  disablePanGesture?: boolean;
};

export function BottomSheet({
  isVisible,
  onClose,
  children,
  snapPoints = [0.3, 0.6, 0.9],
  enableBackdropDismiss = true,
  title,
  style,
  disablePanGesture = false,
}: BottomSheetProps) {
  const cardColor = useColor('card');
  const mutedColor = useColor('muted');
  const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight();

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const opacity = useSharedValue(0);
  const currentSnapIndex = useSharedValue(0);
  // Shared value to hold keyboard height for use in worklets
  const keyboardHeightSV = useSharedValue(0);

  const snapPointsHeights = snapPoints.map((point) => -SCREEN_HEIGHT * point);
  const defaultHeight = snapPointsHeights[0];

  const [modalVisible, setModalVisible] = React.useState(false);

  // Effect to handle opening and closing the bottom sheet
  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      translateY.value = withSpring(defaultHeight, {
        damping: 50,
        stiffness: 400,
      });
      opacity.value = withTiming(1, { duration: 300 });
      currentSnapIndex.value = 0;
    } else {
      translateY.value = withSpring(0, { damping: 50, stiffness: 400 });
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(setModalVisible)(false);
        }
      });
    }
  }, [isVisible, defaultHeight]);

  // Function to animate the sheet to a specific destination
  const scrollTo = (destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 50, stiffness: 400 });
  };

  // --- START: NEW KEYBOARD HANDLING LOGIC ---
  useEffect(() => {
    // Update the shared value whenever keyboardHeight changes
    keyboardHeightSV.value = keyboardHeight;

    // Only adjust position if the sheet is currently visible
    if (isVisible) {
      const currentSnapHeight = snapPointsHeights[currentSnapIndex.value];
      let destination: number;

      if (isKeyboardVisible) {
        // Keyboard is open, move sheet up by keyboard height
        destination = currentSnapHeight - keyboardHeight;
      } else {
        // Keyboard is closed, return to original snap point
        destination = currentSnapHeight;
      }
      scrollTo(destination);
    }
  }, [keyboardHeight, isKeyboardVisible, isVisible]);
  // --- END: NEW KEYBOARD HANDLING LOGIC ---

  const findClosestSnapPoint = (currentY: number) => {
    'worklet';
    // Adjust the currentY by the keyboard height to find the original snap point
    const adjustedY = currentY + keyboardHeightSV.value;

    let closest = snapPointsHeights[0];
    let minDistance = Math.abs(adjustedY - closest);
    let closestIndex = 0;

    for (let i = 0; i < snapPointsHeights.length; i++) {
      const snapPoint = snapPointsHeights[i];
      const distance = Math.abs(adjustedY - snapPoint);
      if (distance < minDistance) {
        minDistance = distance;
        closest = snapPoint;
        closestIndex = i;
      }
    }
    currentSnapIndex.value = closestIndex;
    return closest;
  };

  const handlePress = () => {
    const nextIndex = (currentSnapIndex.value + 1) % snapPointsHeights.length;
    currentSnapIndex.value = nextIndex;
    const destination = snapPointsHeights[nextIndex] - keyboardHeightSV.value;
    scrollTo(destination);
  };

  const animateClose = () => {
    'worklet';
    translateY.value = withSpring(0, { damping: 50, stiffness: 400 });
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
      if (newY <= 0 && newY >= MAX_TRANSLATE_Y) {
        translateY.value = newY;
      }
    })
    .onEnd((event) => {
      const currentY = translateY.value;
      const velocity = event.velocityY;

      if (velocity > 500 && currentY > -SCREEN_HEIGHT * 0.2) {
        animateClose();
        return;
      }

      // Find the closest original snap point
      const closestSnapPoint = findClosestSnapPoint(currentY);
      // Calculate the final destination, accounting for the keyboard height
      const finalDestination = closestSnapPoint - keyboardHeightSV.value;
      scrollTo(finalDestination);
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
      animateClose();
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      statusBarTranslucent
      animationType='none'
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View
          style={[
            { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            rBackdropStyle,
          ]}
        >
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Animated.View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          {disablePanGesture ? (
            <BottomSheetContent
              children={children}
              title={title}
              style={style}
              rBottomSheetStyle={rBottomSheetStyle}
              cardColor={cardColor}
              mutedColor={mutedColor}
              onHandlePress={() => runOnJS(handlePress)()}
            />
          ) : (
            <GestureDetector gesture={gesture}>
              <BottomSheetContent
                children={children}
                title={title}
                style={style}
                rBottomSheetStyle={rBottomSheetStyle}
                cardColor={cardColor}
                mutedColor={mutedColor}
                onHandlePress={() => runOnJS(handlePress)()}
              />
            </GestureDetector>
          )}
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
