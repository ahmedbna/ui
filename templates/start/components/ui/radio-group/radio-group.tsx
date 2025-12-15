import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../text';
import { Circle } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface RadioItemProps {
  value: string;
  label: string;
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

export const RadioGroup = ({ value, onValueChange, children }: RadioGroupProps) => {
  return (
    <View style={styles.container}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, {
            selectedValue: value,
            onSelect: onValueChange,
          });
        }
        return child;
      })}
    </View>
  );
};

export const RadioItem = ({ value, label, selectedValue, onSelect }: RadioItemProps) => {
  const selected = value === selectedValue;
  const primaryColor = useColor('primary');
  const mutedColor = useColor('mutedForeground');

  return (
    <TouchableOpacity
        style={styles.item}
        onPress={() => onSelect && onSelect(value)}
        activeOpacity={0.7}
    >
      <View style={[styles.radio, selected && { borderColor: primaryColor }]}>
        {selected && <View style={[styles.dot, { backgroundColor: primaryColor }]} />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
