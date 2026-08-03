import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useHaptics } from '@/hooks/useHaptics';
import { ChevronRight } from 'lucide-react-native';
import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function Collapsible({
  children,
  title,
  haptic = true,
}: PropsWithChildren & { title: string; haptic?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const feedback = useHaptics(haptic);

  const handlePress = () => {
    feedback(isOpen ? 'toggle-off' : 'toggle-on');
    setIsOpen((value) => !value);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        }}
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityRole='button'
        accessibilityState={{ expanded: isOpen }}
      >
        <Icon
          name={ChevronRight}
          size={18}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <Text variant='subtitle'>{title}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            marginTop: 6,
            marginLeft: 24,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}
