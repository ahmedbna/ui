import { useState, useEffect, useRef } from 'react';
import {
  Keyboard,
  Platform,
  Dimensions,
  KeyboardEvent,
  EmitterSubscription,
} from 'react-native';

interface UseKeyboardHeightReturn {
  keyboardHeight: number;
  isKeyboardVisible: boolean;
  keyboardAnimationDuration: number;
}

export const useKeyboardHeight = (): UseKeyboardHeightReturn => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [keyboardAnimationDuration, setKeyboardAnimationDuration] =
    useState<number>(0);

  // Store previous height to handle edge cases
  const previousHeightRef = useRef<number>(0);

  useEffect(() => {
    let showSubscription: EmitterSubscription;
    let hideSubscription: EmitterSubscription;

    // Determine which events to listen to based on platform
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    // Handle keyboard show
    const handleKeyboardShow = (event: KeyboardEvent) => {
      const { height } = event.endCoordinates;
      const duration = event.duration;

      // Validate height - sometimes we get invalid values
      if (height && height > 0) {
        setKeyboardHeight(height);
        setIsKeyboardVisible(true);
        setKeyboardAnimationDuration(duration || 250); // Default duration if not provided
        previousHeightRef.current = height;
      }
    };

    // Handle keyboard hide
    const handleKeyboardHide = (event: KeyboardEvent) => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);

      // Get animation duration (iOS provides this, Android might not)
      const duration = event.duration || (Platform.OS === 'ios' ? 250 : 200);
      setKeyboardAnimationDuration(duration);
    };

    // Add event listeners
    showSubscription = Keyboard.addListener(showEvent, handleKeyboardShow);
    hideSubscription = Keyboard.addListener(hideEvent, handleKeyboardHide);

    // Cleanup function
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Additional effect to handle edge cases and screen rotation
  useEffect(() => {
    let dimensionSubscription: EmitterSubscription;

    const handleDimensionChange = () => {
      // If keyboard was visible and screen rotated, we might need to recalculate
      if (isKeyboardVisible && previousHeightRef.current > 0) {
        // On screen rotation, keyboard height might change
        // This is more relevant for tablets and landscape mode
        const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;

        // Simple heuristic: if we're in landscape and had a keyboard,
        // the height might be different
        if (screenWidth > screenHeight && Platform.OS === 'ios') {
          // iOS landscape keyboard is typically shorter
          const estimatedLandscapeHeight = Math.min(
            previousHeightRef.current,
            screenHeight * 0.4
          );
          setKeyboardHeight(estimatedLandscapeHeight);
        }
      }
    };

    // Listen to dimension changes (rotation, split screen, etc.)
    dimensionSubscription = Dimensions.addEventListener(
      'change',
      handleDimensionChange
    );

    return () => {
      dimensionSubscription?.remove();
    };
  }, [isKeyboardVisible]);

  return {
    keyboardHeight,
    isKeyboardVisible,
    keyboardAnimationDuration,
  };
};

// Example usage:
/*
import useKeyboardHeight from './useKeyboardHeight';

const MyComponent: React.FC = () => {
  const { keyboardHeight, isKeyboardVisible, keyboardAnimationDuration } = useKeyboardHeight();
  
  return (
    <View style={{ 
      flex: 1, 
      paddingBottom: isKeyboardVisible ? keyboardHeight : 0 
    }}>
      <Text>Keyboard Height: {keyboardHeight}</Text>
      <Text>Keyboard Visible: {isKeyboardVisible ? 'Yes' : 'No'}</Text>
      <Text>Animation Duration: {keyboardAnimationDuration}ms</Text>
    </View>
  );
};
*/
