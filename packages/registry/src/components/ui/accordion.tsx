import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useHaptics } from '@/hooks/useHaptics';
import { ChevronRight } from 'lucide-react-native';
import React, { createContext, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// Context for accordion state
interface AccordionContextType {
  type: 'single' | 'multiple';
  collapsible?: boolean;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  haptic?: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

// Main Accordion component
interface AccordionProps {
  type: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  haptic?: boolean;
}

export function Accordion({
  type,
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  haptic = true,
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  );

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string | string[]) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <AccordionContext.Provider
      value={{
        type,
        collapsible,
        value,
        onValueChange: handleValueChange,
        haptic,
      }}
    >
      <View style={{ width: '100%' }}>{children}</View>
    </AccordionContext.Provider>
  );
}

// AccordionItem component
interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
}

export function AccordionItem({ value, children }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  // Called before the guard below so the hook order stays stable.
  const feedback = useHaptics(context?.haptic ?? true);

  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const isOpen = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  const toggle = () => {
    if (!context.onValueChange) return;

    if (context.type === 'single') {
      // A non-collapsible single accordion keeps the open item open, so tapping
      // it changes nothing and must not feel like it did.
      const willClose = isOpen && !!context.collapsible;
      if (!isOpen || willClose) {
        feedback(willClose ? 'toggle-off' : 'toggle-on');
      }
      const newValue = willClose ? '' : value;
      context.onValueChange(newValue);
    } else {
      feedback(isOpen ? 'toggle-off' : 'toggle-on');
      const currentValues = Array.isArray(context.value) ? context.value : [];
      const newValue = isOpen
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      context.onValueChange(newValue);
    }
  };

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, toggle }}>
      <View>{children}</View>
    </AccordionItemContext.Provider>
  );
}

// Context for accordion item
interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(
  null
);

// AccordionTrigger component
interface AccordionTriggerProps {
  children: React.ReactNode;
}

export function AccordionTrigger({ children }: AccordionTriggerProps) {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 6,
      }}
      onPress={context.toggle}
      activeOpacity={0.8}
      accessibilityRole='button'
      accessibilityState={{ expanded: context.isOpen }}
    >
      <Text variant='subtitle'>{children}</Text>
      <Icon
        name={ChevronRight}
        size={18}
        style={{
          transform: [{ rotate: context.isOpen ? '90deg' : '0deg' }],
        }}
      />
    </TouchableOpacity>
  );
}

// AccordionContent component
interface AccordionContentProps {
  children: React.ReactNode;
  style?: object;
}

export function AccordionContent({ children, style }: AccordionContentProps) {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  if (!context.isOpen) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={[
        {
          paddingBottom: 16,
          paddingLeft: 0,
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
