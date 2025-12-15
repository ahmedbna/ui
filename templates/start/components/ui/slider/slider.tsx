import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NativeSlider from '@react-native-community/slider';
import { useColor } from '@/hooks/useColor';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
}

export const Slider = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  label,
  showValue = true,
}: SliderProps) => {
  const primaryColor = useColor('primary');

  const textColor = useColor('text');
  const trackColor = useColor('border');

  return (
    <View style={styles.container}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
          {showValue && <Text style={[styles.value, { color: textColor }]}>{value}</Text>}
        </View>
      )}
      <NativeSlider
        style={{ width: '100%', height: 40 }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={primaryColor}
        maximumTrackTintColor={trackColor}
        thumbTintColor={primaryColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    opacity: 0.7,
  },
});
