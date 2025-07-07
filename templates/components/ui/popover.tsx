import { Button } from '@/components/ui/button';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// Context for sharing state between popover components
interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number };
  setTriggerLayout: (layout: any) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover');
  }
  return context;
};

// Main Popover wrapper
interface PopoverProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  open = false,
  onOpenChange,
}: PopoverProps) {
  const [isOpen, setIsOpenState] = useState(open);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // Sync with external open state
  useEffect(() => {
    setIsOpenState(open);
  }, [open]);

  const setIsOpen = (newOpen: boolean) => {
    setIsOpenState(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        setIsOpen,
        triggerLayout,
        setTriggerLayout,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

// Popover Trigger
interface PopoverTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  style?: ViewStyle;
}

export function PopoverTrigger({
  children,
  asChild = false,
  style,
}: PopoverTriggerProps) {
  const { setIsOpen, setTriggerLayout, isOpen } = usePopover();
  const triggerRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);

  const measureTrigger = () => {
    if (triggerRef.current) {
      triggerRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setTriggerLayout({ x: pageX, y: pageY, width, height });
        }
      );
    }
  };

  const handlePress = () => {
    measureTrigger();
    setIsOpen(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    // Clone the child and add onPress handler
    return React.cloneElement(children, {
      ref: triggerRef,
      onPress: handlePress,
      style: [(children.props as any).style, style],
    } as any);
  }

  return (
    <Button ref={triggerRef} style={style} onPress={handlePress}>
      {children}
    </Button>
  );
}

// Popover Content
interface PopoverContentProps {
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  alignOffset?: number;
  style?: ViewStyle;
  maxWidth?: number;
  maxHeight?: number;
}

export function PopoverContent({
  children,
  align = 'center',
  side = 'bottom',
  sideOffset = 8,
  alignOffset = 0,
  style,
  maxWidth = 300,
  maxHeight = 400,
}: PopoverContentProps) {
  const { isOpen, setIsOpen, triggerLayout } = usePopover();
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const popoverColor = useThemeColor({}, 'popover');
  const borderColor = useThemeColor({}, 'border');

  const handleClose = () => {
    setIsOpen(false);
  };

  // Calculate position based on side and align props
  const getPosition = () => {
    const screenDimensions = Dimensions.get('window');
    const { x, y, width, height } = triggerLayout;

    // Use actual content size if available, otherwise use maxWidth/maxHeight
    const contentWidth = contentSize.width || maxWidth;
    const contentHeight = Math.min(
      contentSize.height || maxHeight,
      screenDimensions.height * 0.8
    );

    let top = 0;
    let left = 0;
    let actualSide = side;

    // Initial position calculation based on preferred side
    switch (side) {
      case 'top':
        top = y - contentHeight - sideOffset;
        break;
      case 'bottom':
        top = y + height + sideOffset;
        break;
      case 'left':
        left = x - contentWidth - sideOffset;
        break;
      case 'right':
        left = x + width + sideOffset;
        break;
    }

    // Calculate alignment for vertical sides (top/bottom)
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          left = x + alignOffset;
          break;
        case 'center':
          left = x + width / 2 - contentWidth / 2 + alignOffset;
          break;
        case 'end':
          left = x + width - contentWidth + alignOffset;
          break;
      }
    }
    // Calculate alignment for horizontal sides (left/right)
    else {
      switch (align) {
        case 'start':
          top = y + alignOffset;
          break;
        case 'center':
          top = y + height / 2 - contentHeight / 2 + alignOffset;
          break;
        case 'end':
          top = y + height - contentHeight + alignOffset;
          break;
      }
    }

    // Screen boundary adjustments with side flipping
    const padding = 16;

    // Check if we need to flip sides due to space constraints
    if (side === 'top' && top < padding) {
      // Not enough space on top, try bottom
      const bottomSpace = screenDimensions.height - (y + height + sideOffset);
      if (bottomSpace >= contentHeight) {
        actualSide = 'bottom';
        top = y + height + sideOffset;
      } else {
        // Keep top but adjust position
        top = padding;
      }
    } else if (
      side === 'bottom' &&
      top + contentHeight > screenDimensions.height - padding
    ) {
      // Not enough space on bottom, try top
      const topSpace = y - sideOffset;
      if (topSpace >= contentHeight) {
        actualSide = 'top';
        top = y - contentHeight - sideOffset;
      } else {
        // Keep bottom but adjust position
        top = screenDimensions.height - contentHeight - padding;
      }
    } else if (side === 'left' && left < padding) {
      // Not enough space on left, try right
      const rightSpace = screenDimensions.width - (x + width + sideOffset);
      if (rightSpace >= contentWidth) {
        actualSide = 'right';
        left = x + width + sideOffset;
      } else {
        // Keep left but adjust position
        left = padding;
      }
    } else if (
      side === 'right' &&
      left + contentWidth > screenDimensions.width - padding
    ) {
      // Not enough space on right, try left
      const leftSpace = x - sideOffset;
      if (leftSpace >= contentWidth) {
        actualSide = 'left';
        left = x - contentWidth - sideOffset;
      } else {
        // Keep right but adjust position
        left = screenDimensions.width - contentWidth - padding;
      }
    }

    // Final boundary adjustments (without side flipping)
    if (left < padding) {
      left = padding;
    } else if (left + contentWidth > screenDimensions.width - padding) {
      left = screenDimensions.width - contentWidth - padding;
    }

    if (top < padding) {
      top = padding;
    } else if (top + contentHeight > screenDimensions.height - padding) {
      top = screenDimensions.height - contentHeight - padding;
    }

    return {
      top: Math.max(padding, top),
      left: Math.max(padding, left),
      maxWidth,
      maxHeight: Math.min(maxHeight, screenDimensions.height - 2 * padding),
      actualSide,
    };
  };

  const position = getPosition();

  const handleContentLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setContentSize({ width, height });
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType='fade'
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: popoverColor,
              borderColor: borderColor,
              top: position.top,
              left: position.left,
              maxWidth: position.maxWidth,
              maxHeight: position.maxHeight,
            },
            style,
          ]}
          onLayout={handleContentLayout}
          onStartShouldSetResponder={() => true}
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}

// Popover Header
interface PopoverHeaderProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function PopoverHeader({ children, style }: PopoverHeaderProps) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.header, { borderBottomColor: borderColor }, style]}>
      {children}
    </View>
  );
}

// Popover Body
interface PopoverBodyProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function PopoverBody({ children, style }: PopoverBodyProps) {
  return <View style={[styles.body, style]}>{children}</View>;
}

// Popover Footer
interface PopoverFooterProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function PopoverFooter({ children, style }: PopoverFooterProps) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.footer, { borderTopColor: borderColor }, style]}>
      {children}
    </View>
  );
}

// Popover Close (utility component)
interface PopoverCloseProps {
  children: ReactNode;
  asChild?: boolean;
  style?: ViewStyle;
}

export function PopoverClose({
  children,
  asChild = false,
  style,
}: PopoverCloseProps) {
  const { setIsOpen } = usePopover();

  const handlePress = () => {
    setIsOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPress: handlePress,
      style: [(children.props as any).style, style],
    } as any);
  }

  return (
    <TouchableOpacity style={style} onPress={handlePress} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 200, // Ensure minimum width
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  body: {
    padding: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});
