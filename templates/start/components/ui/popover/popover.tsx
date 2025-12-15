import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Platform, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColor } from '@/hooks/useColor';

/*
 * A simple Popover implementation.
 * For production, consider using libraries like `react-native-popover-view`
 * or primitives that handle positioning automatically.
 */

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  contentStyle?: ViewStyle;
}

export const Popover = ({ trigger, content, contentStyle }: PopoverProps) => {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const bgColor = useColor('background');

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {trigger}
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
        >
            <View style={[styles.content, { marginTop: insets.top + 50, backgroundColor: bgColor }, contentStyle]}>
                {content}
            </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    borderRadius: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  }
});
