import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS, HEIGHT } from '@/theme/globals';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');
const PICKER_SIZE = screenWidth - 40;
const HUE_BAR_HEIGHT = 40;
const KNOB_SIZE = 40;

// Color utility functions
const hsvToRgb = (h: number, s: number, v: number) => {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : diff / max;
  const v = max;

  return { h, s, v };
};

interface ColorSwatchProps {
  color: string;
  size?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  size = 32,
  style,
  onPress,
}) => {
  const borderColor = useThemeColor({}, 'border');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          borderWidth: 2,
          borderColor,
        },
        style,
      ]}
      activeOpacity={onPress ? 0.8 : 1}
    />
  );
};

interface ColorPickerProps {
  value?: string;
  onColorChange?: (color: string) => void;
  onColorSelect?: (color: string) => void;
  swatchSize?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#ff0000',
  onColorChange,
  onColorSelect,
  swatchSize = HEIGHT,
  disabled = false,
  style,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState(value);
  const [pureHueColor, setPureHueColor] = useState('#ff0000');

  const backgroundColor = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');

  // Initialize HSV values from the current color
  const rgb = hexToRgb(currentColor);
  const initialHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);

  const hue = useSharedValue(initialHsv.h);
  const saturation = useSharedValue(initialHsv.s);
  const brightness = useSharedValue(initialHsv.v);

  const updateColor = useCallback(
    (h: number, s: number, v: number) => {
      const rgb = hsvToRgb(h, s, v);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setCurrentColor(hex);
      onColorChange?.(hex);

      // Update pure hue color for the saturation/brightness picker
      const pureRgb = hsvToRgb(h, 1, 1);
      const pureHex = rgbToHex(pureRgb.r, pureRgb.g, pureRgb.b);
      setPureHueColor(pureHex);
    },
    [onColorChange]
  );

  // Update pure hue color when modal opens
  useEffect(() => {
    if (isModalVisible) {
      const rgb = hexToRgb(currentColor);
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      hue.value = hsv.h;
      saturation.value = hsv.s;
      brightness.value = hsv.v;

      const pureRgb = hsvToRgb(hsv.h, 1, 1);
      const pureHex = rgbToHex(pureRgb.r, pureRgb.g, pureRgb.b);
      setPureHueColor(pureHex);
    }
  }, [isModalVisible, currentColor]);

  // Hue bar gesture using new Gesture API
  const hueGesture = Gesture.Pan().onUpdate((event) => {
    const newX = Math.max(
      0,
      Math.min(PICKER_SIZE - KNOB_SIZE, event.x - KNOB_SIZE / 2)
    );
    const newHue = (newX / (PICKER_SIZE - KNOB_SIZE)) * 360;
    hue.value = newHue;
    runOnJS(updateColor)(newHue, saturation.value, brightness.value);
  });

  // Saturation/Brightness picker gesture using new Gesture API
  const pickerGesture = Gesture.Pan().onUpdate((event) => {
    const newX = Math.max(
      0,
      Math.min(PICKER_SIZE - KNOB_SIZE, event.x - KNOB_SIZE / 2)
    );
    const newY = Math.max(
      0,
      Math.min(PICKER_SIZE - KNOB_SIZE, event.y - KNOB_SIZE / 2)
    );

    const newSaturation = newX / (PICKER_SIZE - KNOB_SIZE);
    const newBrightness = 1 - newY / (PICKER_SIZE - KNOB_SIZE);

    saturation.value = newSaturation;
    brightness.value = newBrightness;

    runOnJS(updateColor)(hue.value, newSaturation, newBrightness);
  });

  const hueKnobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (hue.value / 360) * (PICKER_SIZE - KNOB_SIZE) }],
  }));

  const pickerKnobStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: saturation.value * (PICKER_SIZE - KNOB_SIZE) },
      { translateY: (1 - brightness.value) * (PICKER_SIZE - KNOB_SIZE) },
    ],
  }));

  const handleColorSelect = () => {
    onColorSelect?.(currentColor);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setCurrentColor(value);
    setIsModalVisible(false);
  };

  return (
    <View style={style}>
      <ColorSwatch
        color={currentColor}
        size={swatchSize}
        onPress={disabled ? undefined : () => setIsModalVisible(true)}
      />

      <Modal
        visible={isModalVisible}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={handleCancel}
      >
        <View style={[styles.modalContainer, { backgroundColor: card }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <Text variant='title'>Choose Color</Text>
            <TouchableOpacity onPress={handleColorSelect}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Color Preview */}
            <View
              style={{
                height: 80,
                width: '100%',
                alignItems: 'center',
                marginBottom: 30,
                justifyContent: 'center',
                borderRadius: BORDER_RADIUS,
                backgroundColor: currentColor,
              }}
            >
              <Text
                variant='caption'
                style={{ color: textColor, fontWeight: 'bold' }}
              >
                {currentColor.toUpperCase()}
              </Text>
            </View>

            {/* Saturation/Brightness Picker */}
            <View style={styles.pickerContainer}>
              <GestureDetector gesture={pickerGesture}>
                <View style={{ width: PICKER_SIZE, height: PICKER_SIZE }}>
                  {/* Base color layer */}
                  <View
                    style={[
                      styles.colorBase,
                      { backgroundColor: pureHueColor },
                    ]}
                  />

                  {/* Saturation gradient (white to transparent, left to right) */}
                  <ExpoLinearGradient
                    colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientLayer}
                  />

                  {/* Brightness gradient (transparent to black, top to bottom) */}
                  <ExpoLinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientLayer}
                  />

                  <Animated.View style={[styles.pickerKnob, pickerKnobStyle]} />
                </View>
              </GestureDetector>
            </View>

            {/* Hue Bar */}
            <View style={styles.hueContainer}>
              <GestureDetector gesture={hueGesture}>
                <Animated.View>
                  <Svg width={PICKER_SIZE} height={HUE_BAR_HEIGHT}>
                    <Defs>
                      <LinearGradient
                        id='hue'
                        x1='0%'
                        y1='0%'
                        x2='100%'
                        y2='0%'
                      >
                        <Stop offset='0%' stopColor='#ff0000' />
                        <Stop offset='16.66%' stopColor='#ffff00' />
                        <Stop offset='33.33%' stopColor='#00ff00' />
                        <Stop offset='50%' stopColor='#00ffff' />
                        <Stop offset='66.66%' stopColor='#0000ff' />
                        <Stop offset='83.33%' stopColor='#ff00ff' />
                        <Stop offset='100%' stopColor='#ff0000' />
                      </LinearGradient>
                    </Defs>
                    <Rect
                      width={PICKER_SIZE}
                      height={HUE_BAR_HEIGHT}
                      fill='url(#hue)'
                      rx={10}
                    />
                  </Svg>

                  <Animated.View style={[styles.hueKnob, hueKnobStyle]} />
                </Animated.View>
              </GestureDetector>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  pickerContainer: {
    marginBottom: 30,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  colorBase: {
    position: 'absolute',
    width: PICKER_SIZE,
    height: PICKER_SIZE,
    borderRadius: BORDER_RADIUS,
  },
  gradientLayer: {
    position: 'absolute',
    width: PICKER_SIZE,
    height: PICKER_SIZE,
    borderRadius: 12,
  },
  pickerKnob: {
    position: 'absolute',
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: CORNERS,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  hueContainer: {
    borderRadius: CORNERS,
    overflow: 'hidden',
  },
  hueKnob: {
    position: 'absolute',
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: CORNERS,
    backgroundColor: 'white',
    opacity: 0.5,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
