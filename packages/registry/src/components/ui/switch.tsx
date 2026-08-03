import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { useHaptics } from '@/hooks/useHaptics';
import React from 'react';
import {
  Switch as RNSwitch,
  SwitchProps as RNSwitchProps,
  TextStyle,
} from 'react-native';

interface SwitchProps extends RNSwitchProps {
  label?: string;
  error?: string;
  labelStyle?: TextStyle;
  haptic?: boolean;
}

export function Switch({
  label,
  error,
  labelStyle,
  haptic = true,
  onValueChange,
  ...props
}: SwitchProps) {
  const mutedColor = useColor('muted');
  const primary = useColor('primary');
  const danger = useColor('red');
  const feedback = useHaptics(haptic);

  const handleValueChange = React.useCallback(
    (value: boolean) => {
      feedback(value ? 'toggle-on' : 'toggle-off');
      onValueChange?.(value);
    },
    [feedback, onValueChange]
  );

  return (
    <View style={{ marginBottom: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 32, // Ensure consistent height
        }}
      >
        {label && (
          <Text
            variant='caption'
            numberOfLines={2} // Allow wrapping for longer labels
            ellipsizeMode='tail'
            style={[
              {
                color: error ? danger : primary,
                flex: 1, // Take available space
                marginRight: 12, // Add spacing between label and switch
              },
              labelStyle,
            ]}
            pointerEvents='none'
          >
            {label}
          </Text>
        )}

        <RNSwitch
          trackColor={{ false: mutedColor, true: '#7DD87D' }}
          thumbColor={props.value ? '#ffffff' : '#f4f3f4'}
          accessibilityLabel={label}
          {...props}
          onValueChange={handleValueChange}
        />
      </View>

      {error && (
        <Text
          variant='caption'
          numberOfLines={2}
          ellipsizeMode='tail'
          style={[
            {
              fontSize: 12, // Slightly smaller for error text
              color: danger, // Always use danger color for errors
              marginTop: 4, // Add spacing above error text
            },
          ]}
          pointerEvents='none'
        >
          {error}
        </Text>
      )}
    </View>
  );
}
