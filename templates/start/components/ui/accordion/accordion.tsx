import React, { useState } from 'react';
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
import { Text } from '../text';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const mutedColor = useColor('mutedForeground');
  const borderColor = useColor('border');

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={[styles.itemContainer, { borderBottomColor: borderColor }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text variant="body" style={{ fontWeight: '500' }}>{title}</Text>
        {expanded ? (
          <ChevronUp size={20} color={mutedColor} />
        ) : (
          <ChevronDown size={20} color={mutedColor} />
        )}
      </TouchableOpacity>
      {expanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
};

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  content: {
    paddingBottom: 15,
  },
});
