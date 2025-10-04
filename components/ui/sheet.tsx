import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { BORDER_RADIUS, FONT_SIZE } from '@/theme/globals';
import { X } from 'lucide-react-native';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SheetSide = 'left' | 'right';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: SheetSide;
  children: React.ReactNode;
}

interface SheetContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SheetHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SheetTitleProps {
  children: React.ReactNode;
}

interface SheetDescriptionProps {
  children: React.ReactNode;
}

interface SheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: SheetSide;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

const useSheet = () => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('Sheet components must be used within a Sheet');
  }
  return context;
};

export function Sheet({
  open,
  onOpenChange,
  side = 'right',
  children,
}: SheetProps) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange, side }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children, asChild }: SheetTriggerProps) {
  const context = React.useContext(SheetContext);

  const handlePress = () => {
    if (context) {
      context.onOpenChange(true);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: handlePress,
    });
  }

  return <Button onPress={handlePress}>{children}</Button>;
}

export function SheetContent({ children, style }: SheetContentProps) {
  const { open, onOpenChange, side } = useSheet();
  const sheetWidth = Math.min(SCREEN_WIDTH * 0.8, 400);
  const [isVisible, setIsVisible] = React.useState(open);

  const backgroundColor = useColor('background');
  const borderColor = useColor('border');
  const iconColor = useColor('text');

  // Animation values using Reanimated's useSharedValue
  const initialPosition = side === 'left' ? -sheetWidth : sheetWidth;
  const translateX = useSharedValue(initialPosition);
  const overlayOpacity = useSharedValue(0);

  // Effect to handle the animation based on the `open` prop
  useEffect(() => {
    // Reset position if side changes while closed
    if (open && !isVisible) {
      translateX.value = side === 'left' ? -sheetWidth : sheetWidth;
    }

    if (open) {
      setIsVisible(true); // Mount the modal
      // Animate in
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
      overlayOpacity.value = withTiming(1, { duration: 300 });
    } else if (isVisible) {
      // Animate out, then hide modal in the callback
      translateX.value = withTiming(
        initialPosition,
        { duration: 250 },
        (finished) => {
          if (finished) {
            // Use runOnJS to update React state from the UI thread
            runOnJS(setIsVisible)(false);
          }
        }
      );
      overlayOpacity.value = withTiming(0, { duration: 250 });
    }
  }, [open, side, sheetWidth]); // Rerun if these change

  // Animated style for the sheet content
  const animatedSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Animated style for the overlay
  const animatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(overlayOpacity.value, [0, 1], [0, 0.3]),
    };
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType='none'
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        {/* Semi-transparent overlay */}
        <Animated.View style={[styles.overlay, animatedOverlayStyle]}>
          <Pressable style={styles.overlayPressable} onPress={handleClose} />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              borderRadius: BORDER_RADIUS,
              backgroundColor,
              borderColor,
              width: sheetWidth,
              [side]: 0,
            },
            animatedSheetStyle, // Apply the animated style
            style,
          ]}
        >
          {/* Close button */}
          <TouchableOpacity
            style={[
              styles.closeButton,
              {
                backgroundColor: backgroundColor,
                [side === 'left' ? 'right' : 'left']: 16,
              },
            ]}
            onPress={handleClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={20} color={iconColor} />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.contentContainer}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Unchanged components below

export function SheetHeader({ children, style }: SheetHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function SheetTitle({ children }: SheetTitleProps) {
  return (
    <Text variant='title' style={styles.title}>
      {children}
    </Text>
  );
}

export function SheetDescription({ children }: SheetDescriptionProps) {
  const mutedColor = useColor('textMuted');

  return (
    <Text style={[styles.description, { color: mutedColor }]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 1)', // Opacity is controlled by animation
  },
  overlayPressable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    zIndex: 1,
    borderRadius: 999, // Make it circular
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 90,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    fontSize: FONT_SIZE,
    lineHeight: 20,
  },
});
