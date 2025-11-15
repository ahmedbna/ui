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
  Keyboard,
  Platform,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ------------------------------
// Content component (shared)
// ------------------------------

type BottomSheetContentProps = {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
  rBottomSheetStyle: any;
  cardColor: string;
  mutedColor: string;
  onHandlePress?: () => void;
  onContentLayout?: (height: number) => void;
  autoHeight?: boolean;
};

const BottomSheetContent = ({
                              children,
                              title,
                              style,
                              rBottomSheetStyle,
                              cardColor,
                              mutedColor,
                              onHandlePress,
                              onContentLayout,
                              autoHeight = false,
                            }: BottomSheetContentProps) => {
  return (
    <Animated.View
      style={[
        {
          height: autoHeight ? undefined : SCREEN_HEIGHT,
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
      onLayout={
        autoHeight
          ? (event) => {
            const { height } = event.nativeEvent.layout;
            onContentLayout?.(height);
          }
          : undefined
      }
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
          <Text variant="title" style={{ textAlign: 'center' }}>
            {title}
          </Text>
        </View>
      )}

      {/* Content */}
      <View style={{ flex: autoHeight ? 0 : 1, padding: 16 }}>{children}</View>
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
  autoHeight?: boolean;
  /** lift the sheet by keyboard height (default: true) */
  avoidKeyboard?: boolean;
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
  autoHeight = false,
  avoidKeyboard = true,
}: BottomSheetProps) {
  if (autoHeight) disablePanGesture = true;

  const cardColor = useThemeColor({}, 'card');
  const mutedColor = useThemeColor({}, 'muted');

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });
  const opacity = useSharedValue(0);
  const currentSnapIndex = useSharedValue(0);
  // Shared value to hold keyboard height for use in worklets
  const keyboardHeightSV = useSharedValue(0);

  const insets = useSafeAreaInsets();
  const topInset = insets.top;
  const bottomInset = insets.bottom;
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + topInset;

  // autoHeight state
  const contentReadyRef = React.useRef(!autoHeight);
  const firstRenderRef = React.useRef(true);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [snapPointsHeights, setSnapPointsHeights] = React.useState<number[]>(
    autoHeight ? [0] : snapPoints.map((p) => -SCREEN_HEIGHT * p)
  );

  // Use a modal-visible flag so we can animate out before unmount
  const [modalVisible, setModalVisible] = React.useState(false);

  // Update snap points after content measured
  useEffect(() => {
    if (autoHeight && contentHeight > 0) {
      const newHeights = [-contentHeight - bottomInset];
      setSnapPointsHeights(newHeights);
      contentReadyRef.current = true;
    }
  }, [autoHeight, contentHeight, bottomInset]);

  // Keyboard avoidance
  useEffect(() => {
    if (!avoidKeyboard) return;

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onShow = (e: any) => {
      const h = e?.endCoordinates?.height ?? 0;
      const d = e?.duration ?? 250;
      keyboardHeightSV.value = withTiming(h, { duration: d });
    };

    const onHide = (e: any) => {
      const d = e?.duration ?? 250;
      keyboardHeightSV.value = withTiming(0, { duration: d });
    };

    const subShow = Keyboard.addListener(showEvent as any, onShow);
    const subHide = Keyboard.addListener(hideEvent as any, onHide);

    return () => {
      subShow.remove();
      subHide.remove();
    };
  }, [avoidKeyboard, keyboardHeightSV]);

  // Visibility & open/close animations
  useEffect(() => {
    if (isVisible) {
      if ((autoHeight && firstRenderRef.current) || !autoHeight) {
        translateY.value = SCREEN_HEIGHT;
        firstRenderRef.current = false;
      }
      setModalVisible(true);

      if (contentReadyRef.current) {
        const defaultHeight = snapPointsHeights[0];
        translateY.value = withSpring(defaultHeight, {
          damping: 50,
          stiffness: 400,
          overshootClamping: true,
        });
        opacity.value = withTiming(1, { duration: 300 });
        currentSnapIndex.value = 0;
      }
    } else {
      // slide down, then hide modal
      translateY.value = withSpring(0, {
        damping: 50,
        stiffness: 400,
      });
      opacity.value = withTiming(0, { duration: 300 }, (finished) => {
        if (finished) runOnJS(setModalVisible)(false);
      });
      // reset for autoHeight path
      if (autoHeight) {
        firstRenderRef.current = true;
        setContentHeight(0);
        contentReadyRef.current = false;
      }
      // in case keyboard remains open, drop offset to avoid odd close anim
      keyboardHeightSV.value = withTiming(0, { duration: 200 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, snapPointsHeights, contentReadyRef.current]);

  const scrollTo = (dest: number) => {
    'worklet';
    translateY.value = withSpring(dest, { damping: 50, stiffness: 400 });
  };

  const findClosestSnapPoint = (currentY: number) => {
    'worklet';
    let closest = snapPointsHeights[0];
    let minDist = Math.abs(currentY - closest);
    let idx = 0;
    for (let i = 0; i < snapPointsHeights.length; i++) {
      const sp = snapPointsHeights[i];
      const d = Math.abs(currentY - sp);
      if (d < minDist) {
        minDist = d;
        closest = sp;
        idx = i;
      }
    }
    currentSnapIndex.value = idx;
    return closest;
  };

  const handlePress = () => {
    if (autoHeight) {
      animateClose();
    } else {
      const next = (currentSnapIndex.value + 1) % snapPointsHeights.length;
      currentSnapIndex.value = next;
      scrollTo(snapPointsHeights[next]);
    }
  };

  const animateClose = () => {
    'worklet';
    translateY.value = withSpring(SCREEN_HEIGHT, { damping: 50, stiffness: 400 });
    keyboardHeightSV.value = withTiming(0, { duration: 200 });
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

      if (autoHeight) {
        const defaultHeight = snapPointsHeights[0];
        if (currentY > defaultHeight / 2) {
          animateClose();
        } else {
          scrollTo(defaultHeight);
        }
      } else {
        const closest = findClosestSnapPoint(currentY);
        scrollTo(closest);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const tyRaw = translateY.value - keyboardHeightSV.value;
    const ty = Math.max(tyRaw, MAX_TRANSLATE_Y); // don't go under status bar
    return { transform: [{ translateY: ty }] };
  });

  const rBackdropStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const handleBackdropPress = () => {
    if (enableBackdropDismiss) {
      animateClose();
    }
  };

  const handleContentLayout = (h: number) => setContentHeight(h);

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
              autoHeight={autoHeight}
              onContentLayout={handleContentLayout}
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
                autoHeight={autoHeight}
                onContentLayout={handleContentLayout}
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
