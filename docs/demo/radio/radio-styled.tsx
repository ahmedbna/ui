import { RadioGroup } from '@/components/ui/radio';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';

export function RadioStyled() {
  const green = useThemeColor({}, 'green');
  const card = useThemeColor({}, 'card');

  const [value1, setValue1] = useState('red');
  const [value2, setValue2] = useState('plan1');

  return (
    <View style={{ gap: 24 }}>
      {/* Custom colors */}
      <View>
        <Text style={{ marginBottom: 12, fontWeight: '500' }}>
          Card-like options
        </Text>
        <RadioGroup
          options={[
            { label: 'Red Theme', value: 'red' },
            { label: 'Blue Theme', value: 'blue' },
            { label: 'Green Theme', value: 'green' },
          ]}
          value={value1}
          onValueChange={setValue1}
          optionStyle={{
            paddingVertical: 12,
            paddingHorizontal: 12,
            backgroundColor: card,
            borderRadius: 8,
            marginBottom: 4,
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: '500',
          }}
        />
      </View>

      {/* Card-like styling */}
      <View>
        <Text style={{ marginBottom: 12, fontWeight: '500' }}>
          Custom styling
        </Text>
        <RadioGroup
          options={[
            { label: 'Basic Plan - $9/month', value: 'plan1' },
            { label: 'Pro Plan - $19/month', value: 'plan2' },
            { label: 'Enterprise - $49/month', value: 'plan3' },
          ]}
          value={value2}
          onValueChange={setValue2}
          optionStyle={{
            paddingVertical: 16,
            paddingHorizontal: 16,
            backgroundColor: green,
            borderRadius: 12,
            marginBottom: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          }}
          labelStyle={{
            fontSize: 15,
            fontWeight: '500',
            color: '#1f2937',
          }}
        />
      </View>
    </View>
  );
}
