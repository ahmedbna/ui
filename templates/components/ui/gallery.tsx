import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { Image } from 'expo-image';
import { Download, Share, X } from 'lucide-react-native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
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
} from 'react-native-reanimated';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface GalleryItem {
  id: string;
  uri: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: number;
  spacing?: number;
  borderRadius?: number;
  aspectRatio?: number;
  showPages?: boolean;
  showTitles?: boolean;
  showDescriptions?: boolean;
  enableFullscreen?: boolean;
  enableZoom?: boolean;
  enableDownload?: boolean;
  enableShare?: boolean;
  onItemPress?: (item: GalleryItem, index: number) => void;
  onDownload?: (item: GalleryItem) => void;
  onShare?: (item: GalleryItem) => void;
  renderCustomOverlay?: (item: GalleryItem, index: number) => React.ReactNode;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

// Improved zoom hook with better gesture handling
interface UseImageZoomProps {
  enableZoom: boolean;
  onSetCanSwipe: (canSwipe: boolean) => void;
  shouldReset?: boolean; // Indicates if the current image has changed and zoom should reset
}

export const useImageZoom = ({
  enableZoom,
  onSetCanSwipe,
  shouldReset = false,
}: UseImageZoomProps) => {
  // Shared values for animated properties
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Saved values to store the state at the start of a gesture
  const savedScale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Shared value to dynamically enable/disable the pan gesture for dragging
  const panGestureEnabled = useSharedValue(false); // Initially disabled

  // Minimum and maximum zoom scale
  const minScale = 0.8;
  const maxScale = 4;

  // Function to reset the image to its initial state (no zoom, no translation)
  const resetZoom = useCallback(() => {
    'worklet'; // Marks this function to run on the UI thread
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
    translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
    savedScale.value = 1;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    // Allow the parent FlatList to swipe when the image is reset
    runOnJS(onSetCanSwipe)(true);
    panGestureEnabled.value = false; // Disable pan gesture when reset
  }, [
    scale,
    translateX,
    translateY,
    savedScale,
    savedTranslateX,
    savedTranslateY,
    onSetCanSwipe,
    panGestureEnabled,
  ]);

  // Effect to reset zoom when the `shouldReset` prop changes (meaning a new image is selected)
  useEffect(() => {
    if (shouldReset) {
      resetZoom();
    }
  }, [shouldReset, resetZoom]);

  // Function to constrain the image translation within its bounds
  const constrainTranslation = useCallback(
    (newScale: number, newTranslateX: number, newTranslateY: number) => {
      'worklet';
      // Calculate maximum allowed translation based on current scale
      const maxTranslateX = Math.max(
        0,
        (screenWidth * newScale - screenWidth) / 2
      );
      const maxTranslateY = Math.max(
        0,
        (screenHeight * newScale - screenHeight) / 2
      );

      // Constrain the new translation values
      const constrainedX = Math.max(
        -maxTranslateX,
        Math.min(maxTranslateX, newTranslateX)
      );
      const constrainedY = Math.max(
        -maxTranslateY,
        Math.min(maxTranslateY, newTranslateY)
      );

      return { x: constrainedX, y: constrainedY };
    },
    []
  );

  // Gesture for double-tapping to zoom in/out
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event) => {
      if (!enableZoom) return; // Only process if zoom is enabled
      ('worklet');

      // If already zoomed in (beyond a small threshold), reset to original size
      if (scale.value > 1.1) {
        resetZoom(); // This will handle setting panGestureEnabled and canSwipe
      } else {
        // Otherwise, zoom to a target scale (e.g., 2.5x)
        const targetScale = 2.5;
        // Calculate tap position relative to the center of the screen
        const tapX = event.x - screenWidth / 2;
        const tapY = event.y - screenHeight / 2;

        // Calculate new translation to make the tapped point the new center
        const newTranslateX = (-tapX * (targetScale - 1)) / targetScale;
        const newTranslateY = (-tapY * (targetScale - 1)) / targetScale;

        // Constrain translation to keep image within bounds
        const constrained = constrainTranslation(
          targetScale,
          newTranslateX,
          newTranslateY
        );

        // Animate scale and translation
        scale.value = withSpring(targetScale, { damping: 20, stiffness: 300 });
        translateX.value = withSpring(constrained.x, {
          damping: 20,
          stiffness: 300,
        });
        translateY.value = withSpring(constrained.y, {
          damping: 20,
          stiffness: 300,
        });

        // Save current state
        savedScale.value = targetScale;
        savedTranslateX.value = constrained.x;
        savedTranslateY.value = constrained.y;

        // Disable parent FlatList swiping as image is now zoomed
        runOnJS(onSetCanSwipe)(false);
        panGestureEnabled.value = true; // Enable pan gesture for dragging zoomed image
      }
    });

  // Gesture for pinching to zoom
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      if (!enableZoom) return;
      ('worklet');
      // Save current state at the start of the pinch
      savedScale.value = scale.value;
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (!enableZoom) return;
      ('worklet');

      // Calculate new scale, clamping it between min and max
      const newScale = Math.max(
        minScale,
        Math.min(maxScale, savedScale.value * event.scale)
      );

      // Calculate focal point relative to the image center
      const focalX = event.focalX - screenWidth / 2;
      const focalY = event.focalY - screenHeight / 2;

      // Calculate new translation to keep the focal point in place during zoom
      const scaleDiff = newScale / savedScale.value;
      const newTranslateX = savedTranslateX.value + focalX * (1 - scaleDiff);
      const newTranslateY = savedTranslateY.value + focalY * (1 - scaleDiff);

      // Constrain translation
      const constrained = constrainTranslation(
        newScale,
        newTranslateX,
        newTranslateY
      );

      // Apply new scale and translation
      scale.value = newScale;
      translateX.value = constrained.x;
      translateY.value = constrained.y;

      // Dynamically enable/disable panGestureEnabled and FlatList scrolling based on zoom level
      panGestureEnabled.value = newScale > 1.1;
      runOnJS(onSetCanSwipe)(newScale <= 1.1); // FlatList scrollable if not zoomed
    })
    .onEnd(() => {
      if (!enableZoom) return;
      ('worklet');

      // If zoomed out too much, reset to original size
      if (scale.value < 1) {
        resetZoom(); // This will handle setting panGestureEnabled and canSwipe
      } else {
        // Save current state after pinch ends
        savedScale.value = scale.value;
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
        // Re-evaluate if panGestureEnabled and FlatList should be able to swipe
        panGestureEnabled.value = scale.value > 1.1;
        runOnJS(onSetCanSwipe)(scale.value <= 1.1);
      }
    });

  // Gesture for panning (dragging) the image when zoomed in
  const panGesture = Gesture.Pan()
    .minPointers(1) // This gesture will respond to a single finger
    .maxPointers(1)
    .enabled(panGestureEnabled.value) // Only enabled if panGestureEnabled.value is true
    .onStart(() => {
      'worklet';
      // If this onStart is called, it means the gesture is enabled and recognized.
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      runOnJS(onSetCanSwipe)(false); // Disable parent FlatList swipe when dragging zoomed image
    })
    .onUpdate((event) => {
      'worklet';
      // This check is a safeguard, but 'enabled' should prevent this from being called if not zoomed.
      if (!enableZoom || !panGestureEnabled.value) return;

      // Calculate new translation based on drag
      const newTranslateX = savedTranslateX.value + event.translationX;
      const newTranslateY = savedTranslateY.value + event.translationY;

      // Constrain translation
      const constrained = constrainTranslation(
        scale.value,
        newTranslateX,
        newTranslateY
      );

      // Apply new translation
      translateX.value = constrained.x;
      translateY.value = constrained.y;
    })
    .onEnd(() => {
      'worklet';
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
      // Re-enable FlatList swipe if not zoomed after pan ends
      runOnJS(onSetCanSwipe)(scale.value <= 1.1);
    });

  // Compose all gestures:
  // - Race: Double tap takes precedence if detected.
  // - Simultaneous: Pinch and dynamically enabled single-finger pan can happen at the same time.
  const composedGesture = Gesture.Race(
    doubleTapGesture,
    Gesture.Simultaneous(pinchGesture, panGesture)
  );

  // Animated style for the image based on scale and translation values
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return {
    animatedImageStyle,
    composedGesture,
    resetZoom,
  };
};

// Fixed fullscreen image component
interface FullscreenImageProps {
  item: GalleryItem;
  index: number;
  selectedIndex: number;
  enableZoom: boolean;
  // Callback to inform the parent FlatList whether it should be scrollable
  onSetCanSwipe: (canSwipe: boolean) => void;
}

const FullscreenImage = memo(
  ({
    item,
    index,
    selectedIndex,
    enableZoom,
    onSetCanSwipe,
  }: FullscreenImageProps) => {
    // Determine if this image is the currently selected one to trigger zoom reset
    const shouldReset = index === selectedIndex;
    const backgroundColor = useThemeColor({}, 'background');
    const { animatedImageStyle, composedGesture } = useImageZoom({
      enableZoom,
      onSetCanSwipe, // Pass the callback to the hook
      shouldReset,
    });

    return (
      <View
        style={{
          width: screenWidth,
          height: screenHeight,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor,
        }}
      >
        {/* GestureDetector always present if zoom is enabled */}
        {enableZoom ? (
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={styles.imageContainer}>
              <AnimatedImage
                source={{ uri: item.uri }}
                style={[styles.fullscreenImage, animatedImageStyle]}
                contentFit='contain'
              />
            </Animated.View>
          </GestureDetector>
        ) : (
          // If zoom is not enabled, render without GestureDetector
          <Animated.View style={styles.imageContainer}>
            <AnimatedImage
              source={{ uri: item.uri }}
              style={[styles.fullscreenImage, animatedImageStyle]}
              contentFit='contain'
            />
          </Animated.View>
        )}
      </View>
    );
  }
);

export function Gallery({
  items,
  columns = 4,
  spacing = 0,
  aspectRatio = 1,
  borderRadius = 0,
  showPages = false,
  showTitles = false,
  showDescriptions = false,
  enableFullscreen = true,
  enableZoom = true,
  enableDownload = false,
  enableShare = false,
  onItemPress,
  onDownload,
  onShare,
  renderCustomOverlay,
}: GalleryProps) {
  // State for the currently selected image index in fullscreen mode
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State for the calculated width of the gallery container
  const [containerWidth, setContainerWidth] = useState(screenWidth);
  // State to control whether the fullscreen FlatList can be swiped horizontally
  const [flatListScrollEnabled, setFlatListScrollEnabled] = useState(true);

  // Refs for the FlatList components
  const fullscreenFlatListRef = useRef<FlatList>(null);
  const thumbnailFlatListRef = useRef<FlatList>(null);

  // Theme colors using custom hook
  const textColor = useThemeColor({}, 'text');
  const primary = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'textMuted');
  const backgroundColor = useThemeColor({}, 'background');
  const secondary = useThemeColor({}, 'secondary');

  // Calculate item width for the grid based on container width, columns, and spacing
  const itemWidth = (containerWidth - spacing * (columns - 1)) / columns;

  // Function to open the fullscreen modal
  const openFullscreen = useCallback(
    (index: number) => {
      if (!enableFullscreen) return; // Only open if fullscreen is enabled
      setSelectedIndex(index);
      setIsModalVisible(true);
      // Initially, allow FlatList scrolling
      setFlatListScrollEnabled(true);

      // Use setTimeout to ensure the modal is fully rendered before trying to scroll the FlatList
      setTimeout(() => {
        fullscreenFlatListRef.current?.scrollToIndex({
          index,
          animated: false,
        });
        thumbnailFlatListRef.current?.scrollToIndex({
          index,
          animated: false,
          viewPosition: 0.5, // Center the thumbnail
        });
      }, 100);
    },
    [enableFullscreen]
  );

  // Function to close the fullscreen modal
  const closeFullscreen = useCallback(() => {
    setIsModalVisible(false);
    setSelectedIndex(-1); // Reset selected index
    setFlatListScrollEnabled(true); // Ensure scrolling is re-enabled on close
  }, []);

  // Handler for pressing a gallery item (thumbnail)
  const handleItemPress = useCallback(
    (item: GalleryItem, index: number) => {
      if (onItemPress) {
        onItemPress(item, index); // Call custom press handler if provided
      } else if (enableFullscreen) {
        openFullscreen(index); // Otherwise, open fullscreen
      }
    },
    [onItemPress, enableFullscreen, openFullscreen]
  );

  // Handler for pressing a thumbnail in the fullscreen bottom bar
  const handleThumbnailPress = useCallback((index: number) => {
    setSelectedIndex(index); // Update selected index
    setFlatListScrollEnabled(true); // Always allow swiping when a thumbnail is tapped
    fullscreenFlatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  // Callback for FlatList to detect when viewable items change (for updating selected index)
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        if (
          newIndex !== selectedIndex &&
          newIndex !== null &&
          newIndex !== undefined
        ) {
          setSelectedIndex(newIndex);
          // Sync thumbnail scroll to the newly selected image
          setTimeout(() => {
            thumbnailFlatListRef.current?.scrollToIndex({
              index: newIndex,
              animated: true,
              viewPosition: 0.5, // Center the thumbnail
            });
          }, 100);
        }
      }
    },
    [selectedIndex]
  );

  // Configuration for viewability of FlatList items
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // An item is "viewable" if 50% of it is visible
  };

  // Helper to get the currently displayed item in fullscreen
  const getCurrentItem = useCallback(() => {
    return selectedIndex >= 0 && selectedIndex < items.length
      ? items[selectedIndex]
      : null;
  }, [selectedIndex, items]);

  // Handler for download button
  const handleDownload = useCallback(() => {
    const currentItem = getCurrentItem();
    if (currentItem && onDownload) {
      onDownload(currentItem);
    }
  }, [getCurrentItem, onDownload]);

  // Handler for share button
  const handleShare = useCallback(() => {
    const currentItem = getCurrentItem();
    if (currentItem && onShare) {
      onShare(currentItem);
    }
  }, [getCurrentItem, onShare]);

  // Render function for each item in the grid gallery
  const renderGalleryItem = useCallback(
    ({ item, index }: { item: GalleryItem; index: number }) => (
      <Pressable
        key={item.id}
        style={[
          {
            width: itemWidth,
            height: itemWidth * aspectRatio,
            borderRadius,
          },
        ]}
        onPress={() => handleItemPress(item, index)}
      >
        <Image
          source={{ uri: item.thumbnail || item.uri }} // Use thumbnail if available, otherwise full URI
          style={[styles.gridImage, { borderRadius }]}
          contentFit='cover'
          transition={200}
        />

        {/* Render custom overlay if provided */}
        {renderCustomOverlay && renderCustomOverlay(item, index)}

        {/* Display title and description if enabled */}
        {(showTitles || showDescriptions) && (
          <View style={[styles.itemInfo]}>
            {showTitles && item.title && (
              <Text
                variant='subtitle'
                numberOfLines={1}
                style={{ color: textColor }}
              >
                {item.title}
              </Text>
            )}
            {showDescriptions && item.description && (
              <Text
                variant='caption'
                numberOfLines={2}
                style={{ color: mutedColor }}
              >
                {item.description}
              </Text>
            )}
          </View>
        )}
      </Pressable>
    ),
    [
      itemWidth,
      aspectRatio,
      borderRadius,
      handleItemPress,
      renderCustomOverlay,
      showTitles,
      showDescriptions,
      textColor,
      mutedColor,
    ]
  );

  // Render function for each item in the fullscreen FlatList
  const renderFullscreenItem = useCallback(
    ({ item, index }: { item: GalleryItem; index: number }) => (
      <FullscreenImage
        key={`fullscreen-${item.id}`} // Unique key for fullscreen items
        item={item}
        index={index}
        selectedIndex={selectedIndex} // Pass selected index for zoom reset logic
        enableZoom={enableZoom}
        onSetCanSwipe={setFlatListScrollEnabled} // Pass the callback to control parent FlatList's scroll
      />
    ),
    [enableZoom, selectedIndex]
  );

  // Render controls for the fullscreen modal (top and bottom bars)
  const renderFullscreenControls = () => {
    const currentItem = getCurrentItem();

    return (
      <View style={styles.fullscreenControls} pointerEvents='box-none'>
        {/* Top controls (share, download, close) */}
        <View style={[styles.topControls, { backgroundColor }]}>
          <View style={styles.topRightControls}>
            {enableDownload && onDownload && (
              <Button size='icon' variant='ghost' onPress={handleDownload}>
                <Download size={24} color={primary} />
              </Button>
            )}
            {enableShare && onShare && (
              <Button size='icon' variant='ghost' onPress={handleShare}>
                <Share size={24} color={primary} />
              </Button>
            )}
          </View>

          <Button size='icon' variant='ghost' onPress={closeFullscreen}>
            <X size={26} color={primary} />
          </Button>
        </View>

        {/* Bottom controls (page, title, description, thumbnails) */}
        <View style={[styles.bottomControls, { backgroundColor }]}>
          {showPages && (
            <Text
              variant='caption'
              style={{
                textAlign: 'center',
                marginBottom: 8,
                color: mutedColor,
              }}
            >
              {selectedIndex + 1} of {items.length}
            </Text>
          )}

          {currentItem?.title && (
            <Text
              variant='subtitle'
              style={{ textAlign: 'center', marginBottom: 8, color: textColor }}
              numberOfLines={1}
            >
              {currentItem.title}
            </Text>
          )}

          {currentItem?.description && (
            <Text
              variant='caption'
              style={{
                textAlign: 'center',
                marginBottom: 16,
                color: mutedColor,
              }}
              numberOfLines={2}
            >
              {currentItem.description}
            </Text>
          )}

          {/* Horizontal FlatList for thumbnails */}
          <FlatList
            ref={thumbnailFlatListRef}
            data={items}
            renderItem={({ item, index }) => (
              <Pressable
                style={[
                  styles.thumbnailItem,
                  selectedIndex === index && {
                    borderColor: secondary, // Highlight selected thumbnail
                    borderWidth: 2,
                  },
                ]}
                onPress={() => handleThumbnailPress(index)}
              >
                <Image
                  source={{ uri: item.thumbnail || item.uri }}
                  style={styles.thumbnailImage}
                  contentFit='cover'
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailContainer}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // Spacing between thumbnails
            getItemLayout={(data, index) => ({
              length: 48, // Fixed item length for layout calculation
              offset: 56 * index, // Offset for each item (item length + separator width)
              index,
            })}
          />
        </View>
      </View>
    );
  };

  // Render empty state if no items are provided
  if (items.length === 0) {
    return (
      <View style={[styles.emptyState]}>
        <Text variant='subtitle' style={{ color: mutedColor }}>
          No images to display
        </Text>
      </View>
    );
  }

  return (
    // GestureHandlerRootView is required for React Native Gesture Handler to work
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* ScrollView for the main gallery grid */}
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        contentContainerStyle={[styles.grid, { gap: spacing }]}
        showsVerticalScrollIndicator={false}
        // Measure the container width on layout to calculate item widths dynamically
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setContainerWidth(width);
        }}
      >
        {/* Render each gallery item */}
        {items.map((item, index) => renderGalleryItem({ item, index }))}
      </ScrollView>

      {/* Modal for fullscreen image view */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType='fade'
        onRequestClose={closeFullscreen}
      >
        <View style={{ flex: 1, backgroundColor }}>
          {/* GestureHandlerRootView for gestures within the modal */}
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* FlatList for horizontal swiping of fullscreen images */}
            <FlatList
              ref={fullscreenFlatListRef}
              data={items}
              renderItem={renderFullscreenItem}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled // Enables snap-to-page behavior for horizontal swiping
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged} // Detect when current image changes
              viewabilityConfig={viewabilityConfig}
              getItemLayout={(data, index) => ({
                length: screenWidth, // Each item takes full screen width
                offset: screenWidth * index,
                index,
              })}
              scrollEnabled={flatListScrollEnabled} // Control FlatList scrolling based on zoom state
              removeClippedSubviews={false} // Important for images that are partially off-screen due to zoom
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={21}
            />
          </GestureHandlerRootView>
          {/* Render fullscreen controls overlay */}
          {renderFullscreenControls()}
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    flex: 1,
  },
  itemInfo: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    borderRadius: BORDER_RADIUS,
    margin: 16,
  },
  imageContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: screenWidth,
    height: screenHeight,
  },
  fullscreenControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Ensure controls don't block interaction with the image itself unless explicitly on a button
    pointerEvents: 'box-none',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 56, // Adjust for safe area (notch, status bar)
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topRightControls: {
    gap: 8,
    flexDirection: 'row',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 46, // Adjust for safe area (home indicator)
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    alignItems: 'center', // Vertically center thumbnails
  },
  thumbnailItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: 'transparent',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});
