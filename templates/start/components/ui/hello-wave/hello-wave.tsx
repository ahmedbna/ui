import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { Text } from '../text';

export const HelloWave = () => {
  const rotation = useSharedValue(0);

  rotation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(-25, { duration: 150 }),
      withTiming(0, { duration: 150 })
    ),
    4 // Run 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={styles.text}>👋</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
