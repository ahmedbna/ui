// Example usage of Color Picker component
import { Button } from '@/components/ui/button';
import { ColorPicker, ColorSwatch } from '@/components/ui/color-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export function ColorPickerDemo() {
  const [selectedColor, setSelectedColor] = useState('#ff6b6b');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#333333');

  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  const predefinedColors = [
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#96ceb4',
    '#feca57',
    '#ff9ff3',
    '#54a0ff',
    '#5f27cd',
    '#00d2d3',
    '#ff9f43',
    '#c44569',
    '#f8b500',
    '#78e08f',
    '#e55039',
    '#3742fa',
  ];

  const resetColors = () => {
    setSelectedColor('#ff6b6b');
    setBackgroundColor('#ffffff');
    setTextColor('#333333');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text variant='title'>Color Picker demo</Text>
        <Text variant='caption' style={styles.subtitle}>
          Tap on any color swatch to open the color picker
        </Text>
      </View>

      {/* Basic Color Picker */}
      <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
        <Text variant='subtitle' style={styles.cardTitle}>
          Basic Color Picker
        </Text>
        <View style={styles.row}>
          <ColorPicker
            value={selectedColor}
            onColorChange={setSelectedColor}
            onColorSelect={setSelectedColor}
          />
          <View style={styles.colorInfo}>
            <Text variant='body'>Selected Color</Text>
            <Text variant='caption'>{selectedColor.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Multiple Color Pickers */}
      <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
        <Text variant='subtitle' style={styles.cardTitle}>
          Theme Customization
        </Text>

        <View style={styles.colorRow}>
          <View style={styles.colorGroup}>
            <Text variant='caption'>Background</Text>
            <ColorPicker
              value={backgroundColor}
              onColorChange={setBackgroundColor}
              onColorSelect={setBackgroundColor}
              swatchSize={40}
            />
          </View>

          <View style={styles.colorGroup}>
            <Text variant='caption'>Text Color</Text>
            <ColorPicker
              value={textColor}
              onColorChange={setTextColor}
              onColorSelect={setTextColor}
              swatchSize={40}
            />
          </View>
        </View>

        {/* Preview */}
        <View
          style={[
            styles.preview,
            {
              backgroundColor: backgroundColor,
              borderColor: borderColor,
            },
          ]}
        >
          <Text style={{ color: textColor, fontSize: 16 }}>Preview Text</Text>
        </View>

        <Button
          variant='outline'
          onPress={resetColors}
          style={styles.resetButton}
        >
          Reset Colors
        </Button>
      </View>

      {/* Predefined Color Swatches */}
      <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
        <Text variant='subtitle' style={styles.cardTitle}>
          Color Swatches
        </Text>
        <Text variant='caption' style={styles.description}>
          These are display-only color swatches without picker functionality
        </Text>
        <View style={styles.swatchGrid}>
          {predefinedColors.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              size={36}
              onPress={() => setSelectedColor(color)}
              style={styles.swatch}
            />
          ))}
        </View>
      </View>

      {/* Large Color Picker */}
      <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
        <Text variant='subtitle' style={styles.cardTitle}>
          Large Color Picker
        </Text>
        <View style={styles.centerContent}>
          <ColorPicker
            value={selectedColor}
            onColorChange={setSelectedColor}
            onColorSelect={setSelectedColor}
            swatchSize={80}
          />
        </View>
      </View>

      {/* Disabled State */}
      <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
        <Text variant='subtitle' style={styles.cardTitle}>
          Disabled State
        </Text>
        <View style={styles.row}>
          <ColorPicker value='#cccccc' disabled={true} swatchSize={48} />
          <Text variant='caption' style={styles.disabledText}>
            This color picker is disabled
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  colorInfo: {
    flex: 1,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  colorGroup: {
    alignItems: 'center',
    gap: 8,
  },
  preview: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  resetButton: {
    alignSelf: 'center',
  },
  description: {
    marginBottom: 12,
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  swatch: {
    marginBottom: 4,
  },
  centerContent: {
    alignItems: 'center',
  },
  disabledText: {
    opacity: 0.6,
  },
});
