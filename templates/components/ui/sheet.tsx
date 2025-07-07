import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, FONT_SIZE } from '@/theme/globals';
import { X } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

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

  // Animation values
  const slideAnim = useRef(
    new Animated.Value(side === 'left' ? -sheetWidth : sheetWidth)
  ).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = React.useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'text');

  useEffect(() => {
    if (open) {
      // Show the modal first
      setIsVisible(true);

      // Start from off-screen position
      slideAnim.setValue(side === 'left' ? -sheetWidth : sheetWidth);
      overlayOpacity.setValue(0);

      // Small delay to ensure modal is rendered
      const timer = setTimeout(() => {
        // Animate in
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 10);

      return () => clearTimeout(timer);
    } else if (!open && isVisible) {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: side === 'left' ? -sheetWidth : sheetWidth,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Hide the modal after animation completes
        setIsVisible(false);
      });
    }
  }, [open, side, slideAnim, overlayOpacity, sheetWidth, isVisible]);

  const handleClose = () => {
    onOpenChange(false);
  };

  // Don't render anything if not visible
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
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3], // 30% opacity overlay
              }),
            },
          ]}
        >
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
              [side]: 0, // Position on correct side
              transform: [{ translateX: slideAnim }],
            },
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
  const mutedColor = useThemeColor({}, 'textMuted');

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
    backgroundColor: 'rgba(0, 0, 0, 1)', // Will be controlled by opacity animation
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
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
    zIndex: 1000,
    width: 32,
    height: 32,
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
