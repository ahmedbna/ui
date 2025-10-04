import { Text } from '@/components/ui/text';
import {
  Toggle,
  ToggleGroupMultiple,
  ToggleGroupSingle,
} from '@/components/ui/toggle';
import { useColor } from '@/hooks/useColor';
import { BoldIcon, Home, Italic, Underline } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ToggleExamples() {
  const primary = useColor('primary');
  const primaryForeground = useColor('primaryForeground');

  const [toggle, setToggle] = useState(true);
  const [home, sethome] = useState(true);
  const [fontSize, setFontSize] = useState<string>('medium');
  const [textFormatting, setTextFormatting] = useState<string[]>(['bold']);

  const fontSizeItems = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const formattingItems = [
    {
      value: 'bold',
      label: 'Bold',
      icon: BoldIcon,
    },
    {
      value: 'italic',
      label: 'Italic',
      icon: Italic,
    },
    {
      value: 'underline',
      label: 'Underline',
      icon: Underline,
    },
  ];

  return (
    <View style={{ width: '100%' }}>
      {/* Individual Toggles */}
      <View style={styles.section}>
        <Text variant='subtitle' style={{ marginBottom: 8 }}>
          Individual Toggles
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <Toggle
            variant='outline'
            pressed={toggle}
            onPressedChange={setToggle}
          >
            T
          </Toggle>
          <Toggle pressed={home} onPressedChange={sethome}>
            <Home color={home ? primaryForeground : primary} />
          </Toggle>
        </View>
      </View>

      {/* Toggle Group - Font Size */}
      <View style={styles.section}>
        <Text variant='subtitle' style={{ marginBottom: 8 }}>
          Font Size
        </Text>
        <ToggleGroupSingle
          value={fontSize}
          onValueChange={setFontSize}
          items={fontSizeItems}
          size='icon'
        />
      </View>

      {/* Toggle Group - Multiple Selection */}
      <View style={styles.section}>
        <Text variant='subtitle' style={{ marginBottom: 8 }}>
          Text Formatting (Multiple Selection)
        </Text>
        <ToggleGroupMultiple
          value={textFormatting}
          onValueChange={setTextFormatting}
          items={formattingItems}
          variant='outline'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    marginBottom: 32,
  },
});
