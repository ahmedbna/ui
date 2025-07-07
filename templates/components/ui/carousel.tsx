import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { BlurView } from 'expo-blur';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  itemWidth?: number;
  spacing?: number;
  style?: ViewStyle;
  onIndexChange?: (index: number) => void;
}

interface CarouselItemProps {
  children: React.ReactNode;
  style?: ViewStyle[] | ViewStyle;
}

interface CarouselContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onPress?: (index: number) => void;
  style?: ViewStyle;
}

interface CarouselArrowProps {
  direction: 'left' | 'right';
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

// Define the ref interface
export interface CarouselRef {
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  getCurrentIndex: () => number;
}

// Main Carousel Component
export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      autoPlay = false,
      autoPlayInterval = 3000,
      showIndicators = true,
      showArrows = false,
      loop = false,
      itemWidth,
      spacing = 0,
      style,
      onIndexChange,
    },
    ref
  ) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(screenWidth);
    const [isUserInteracting, setIsUserInteracting] = useState(false);

    // Use useRef to store timer ID and prevent stale closures
    const autoPlayTimerRef = useRef<number | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);
    const currentIndexRef = useRef(currentIndex); // Keep ref in sync for auto play

    // Update ref when currentIndex changes
    useEffect(() => {
      currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    // Calculate slide dimensions
    const slideWidth = itemWidth || containerWidth - spacing * 2;
    const snapToInterval = slideWidth + spacing;

    // Clear all timers
    const clearTimers = useCallback(() => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    }, []);

    // Scroll to current index
    const scrollToIndex = useCallback(
      (index: number, animated: boolean = true) => {
        if (scrollViewRef.current && index >= 0 && index < children.length) {
          const scrollX = index * snapToInterval;

          // Use requestAnimationFrame to ensure smooth scrolling
          requestAnimationFrame(() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({
                x: scrollX,
                animated,
              });
            }
          });
        }
      },
      [snapToInterval, children.length]
    );

    // Navigation functions
    const goToSlide = useCallback(
      (index: number) => {
        if (index >= 0 && index < children.length && index !== currentIndex) {
          setCurrentIndex(index);
          setIsUserInteracting(true);
          scrollToIndex(index);

          // Clear auto play timeout to prevent conflicts
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;
          }
        }
      },
      [children.length, scrollToIndex, currentIndex]
    );

    const goToNext = useCallback(() => {
      const nextIndex = currentIndexRef.current + 1;
      const targetIndex =
        nextIndex < children.length
          ? nextIndex
          : loop
          ? 0
          : currentIndexRef.current;
      if (targetIndex !== currentIndexRef.current) {
        setCurrentIndex(targetIndex);
        setIsUserInteracting(true);
        scrollToIndex(targetIndex);

        // Clear auto play timeout to prevent conflicts
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
      }
    }, [children.length, loop, scrollToIndex]);

    const goToPrevious = useCallback(() => {
      const prevIndex = currentIndexRef.current - 1;
      const targetIndex =
        prevIndex >= 0
          ? prevIndex
          : loop
          ? children.length - 1
          : currentIndexRef.current;
      if (targetIndex !== currentIndexRef.current) {
        setCurrentIndex(targetIndex);
        setIsUserInteracting(true);
        scrollToIndex(targetIndex);

        // Clear auto play timeout to prevent conflicts
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
      }
    }, [loop, children.length, scrollToIndex]);

    // Expose methods through ref
    useImperativeHandle(
      ref,
      () => ({
        goToSlide,
        goToNext,
        goToPrevious,
        getCurrentIndex: () => currentIndex,
      }),
      [goToSlide, goToNext, goToPrevious, currentIndex]
    );

    // Start auto play - Fixed to actually scroll the view
    const startAutoPlay = useCallback(() => {
      if (!autoPlay || children.length <= 1 || isUserInteracting) return;

      clearTimers();

      autoPlayTimerRef.current = setInterval(() => {
        const nextIndex = currentIndexRef.current + 1;
        const targetIndex =
          nextIndex >= children.length
            ? loop
              ? 0
              : currentIndexRef.current
            : nextIndex;

        if (targetIndex !== currentIndexRef.current) {
          // Update state and scroll to new position
          setCurrentIndex(targetIndex);
          scrollToIndex(targetIndex, true);
        }
      }, autoPlayInterval);
    }, [
      autoPlay,
      autoPlayInterval,
      children.length,
      loop,
      isUserInteracting,
      clearTimers,
      scrollToIndex,
    ]);

    // Stop auto play
    const stopAutoPlay = useCallback(() => {
      clearTimers();
    }, [clearTimers]);

    // Handle auto play lifecycle
    useEffect(() => {
      if (autoPlay && !isUserInteracting) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }

      return stopAutoPlay;
    }, [autoPlay, isUserInteracting, startAutoPlay, stopAutoPlay]);

    // Handle index changes - notify parent component with debouncing
    useEffect(() => {
      // Use a small delay to prevent rapid-fire updates during navigation
      const timeoutId = setTimeout(() => {
        onIndexChange?.(currentIndex);
      }, 50);

      return () => clearTimeout(timeoutId);
    }, [currentIndex, onIndexChange]);

    // Handle scroll events - only update index from user scrolling
    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // Only update index from scroll if user is manually scrolling
        if (isUserInteracting) {
          const scrollPosition = event.nativeEvent.contentOffset.x;
          const index = Math.round(scrollPosition / snapToInterval);

          if (index !== currentIndex && index >= 0 && index < children.length) {
            setCurrentIndex(index);
          }
        }
      },
      [currentIndex, snapToInterval, children.length, isUserInteracting]
    );

    // Handle momentum scroll end
    const handleMomentumScrollEnd = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / snapToInterval);

        // Update index based on final scroll position
        if (index >= 0 && index < children.length && index !== currentIndex) {
          setCurrentIndex(index);
        }

        // Re-enable auto play after user interaction ends
        if (autoPlay) {
          scrollTimeoutRef.current = setTimeout(() => {
            setIsUserInteracting(false);
          }, 1000);
        }
      },
      [snapToInterval, children.length, autoPlay, currentIndex]
    );

    // Touch handlers
    const handleTouchStart = useCallback(() => {
      setIsUserInteracting(true);
    }, []);

    const handleTouchEnd = useCallback(() => {
      // Don't immediately re-enable auto play, let momentum scroll end handle it
    }, []);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        clearTimers();
      };
    }, [clearTimers]);

    const horizontalPan = Gesture.Pan()
      .onBegin(() => {
        // Optional: trigger when gesture starts
      })
      .onUpdate(() => {
        // Optional: you can track gesture updates here
      })
      .onEnd(() => {
        // Optional: trigger when gesture ends
      })
      .activeOffsetX([-10, 10]) // Allow horizontal pan
      .activeOffsetY([-1000, 1000]); // Block vertical gesture

    return (
      <View
        style={[
          {
            width: '100%',
            minWidth: itemWidth ? itemWidth + spacing * 2 : '100%',
          },
          style,
        ]}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          // Ensure we have a valid width
          if (width > 0) {
            setContainerWidth(width);
          }
        }}
      >
        <View style={{ position: 'relative', overflow: 'hidden' }}>
          <GestureDetector gesture={horizontalPan}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled={!itemWidth}
              snapToInterval={itemWidth ? snapToInterval : undefined}
              snapToAlignment={itemWidth ? 'start' : 'center'}
              decelerationRate={itemWidth ? 'fast' : 'normal'}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              onMomentumScrollEnd={handleMomentumScrollEnd}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              scrollEventThrottle={16}
              bounces={false}
              contentContainerStyle={
                itemWidth
                  ? {
                      paddingHorizontal: spacing,
                    }
                  : {
                      width: children.length * containerWidth,
                    }
              }
            >
              {children.map((child, index) => (
                <View
                  key={index}
                  style={{
                    width: slideWidth,
                    marginRight: itemWidth ? spacing : 0,
                  }}
                >
                  {child}
                </View>
              ))}
            </ScrollView>
          </GestureDetector>

          {showArrows && children.length > 1 && (
            <>
              <CarouselArrow
                direction='left'
                onPress={goToPrevious}
                disabled={!loop && currentIndex === 0}
                style={{
                  position: 'absolute',
                  left: 6,
                  top: '50%',
                  transform: [{ translateY: -12 }],
                  zIndex: 10,
                }}
              />
              <CarouselArrow
                direction='right'
                onPress={goToNext}
                disabled={!loop && currentIndex === children.length - 1}
                style={{
                  position: 'absolute',
                  right: 6,
                  top: '50%',
                  transform: [{ translateY: -12 }],
                  zIndex: 10,
                }}
              />
            </>
          )}
        </View>

        {showIndicators && children.length > 1 && (
          <CarouselIndicators
            total={children.length}
            current={currentIndex}
            onPress={goToSlide}
            style={{
              marginTop: 12,
              alignSelf: 'center',
            }}
          />
        )}
      </View>
    );
  }
);

// Carousel Content Component
export function CarouselContent({ children, style }: CarouselContentProps) {
  return <View style={style}>{children}</View>;
}

// Carousel Item Component - Auto height to fit content
export function CarouselItem({ children, style }: CarouselItemProps) {
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: BORDER_RADIUS,
          borderWidth: 1,
          borderColor,
          padding: 16,
          minHeight: 200, // Keep minimum height for consistency
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Carousel Indicators Component
export function CarouselIndicators({
  total,
  current,
  onPress,
  style,
}: CarouselIndicatorsProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
        },
        style,
      ]}
    >
      {Array.from({ length: total }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPress?.(index)}
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            backgroundColor: index === current ? primaryColor : secondaryColor,
          }}
        />
      ))}
    </View>
  );
}

// Carousel Arrow Component
export function CarouselArrow({
  direction,
  onPress,
  disabled = false,
  style,
}: CarouselArrowProps) {
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          width: 24,
          height: 24,
          borderRadius: 999,
          overflow: 'hidden',
          opacity: disabled ? 0.3 : 1,
        },
        style,
      ]}
      activeOpacity={0.7}
    >
      <BlurView
        tint='systemChromeMaterial' // or "light"/"dark" depending on theme
        intensity={100}
        style={{
          flex: 1,
          borderRadius: 999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {direction === 'left' ? (
          <ChevronLeft size={20} color={primaryColor} />
        ) : (
          <ChevronRight size={20} color={primaryColor} />
        )}
      </BlurView>
    </TouchableOpacity>
  );
}
