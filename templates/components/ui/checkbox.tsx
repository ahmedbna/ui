import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS } from '@/theme/globals';
import { Check } from 'lucide-react-native';
import React from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';

interface CheckboxProps {
  checked: boolean;
  label?: string;
  error?: string;
  disabled?: boolean;
  labelStyle?: TextStyle;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({
  checked,
  error,
  disabled = false,
  label,
  labelStyle,
  onCheckedChange,
}: CheckboxProps) {
  const primary = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const danger = useThemeColor({}, 'red');
  const borderColor = useThemeColor({}, 'border');

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
        paddingVertical: 4,
      }}
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
    >
      <View
        style={{
          width: BORDER_RADIUS,
          height: BORDER_RADIUS,
          borderRadius: BORDER_RADIUS,
          borderWidth: 1.5,
          borderColor: checked ? primary : borderColor,
          backgroundColor: checked ? primary : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: label ? 8 : 0,
        }}
      >
        {checked && (
          <Check
            size={16}
            color={primaryForegroundColor}
            strokeWidth={3}
            strokeLinecap='round'
          />
        )}
      </View>
      {label && (
        <Text
          variant='caption'
          numberOfLines={1}
          ellipsizeMode='tail'
          style={[
            {
              color: error ? danger : primary,
            },
            labelStyle,
          ]}
          pointerEvents='none'
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
