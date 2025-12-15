import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from '../text';
import { X } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';
import { Icon } from '../icon';

interface ChipProps {
  label: string;
  onPress?: () => void;
  onClose?: () => void;
  selected?: boolean;
  variant?: 'filled' | 'outline';
}

export const Chip = ({ label, onPress, onClose, selected, variant = 'filled' }: ChipProps) => {
  const primaryColor = useColor('primary');
  const mutedColor = useColor('muted');
  const borderColorDefault = useColor('border');
  const textColorDefault = useColor('foreground');

  const bgColor = variant === 'filled' ? (selected ? primaryColor : mutedColor) : 'transparent';
  const textColor = variant === 'filled' ? (selected ? 'white' : textColorDefault) : (selected ? primaryColor : textColorDefault);
  const borderColor = variant === 'outline' ? (selected ? primaryColor : borderColorDefault) : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.container,
        { backgroundColor: bgColor, borderColor: borderColor, borderWidth: variant === 'outline' ? 1 : 0 }
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={14} color={textColor} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  closeBtn: {
    marginLeft: 6,
    padding: 2,
  }
});
