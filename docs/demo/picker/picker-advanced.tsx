import { Picker } from '@/components/ui/picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function PickerAdvanced() {
  const [plan, setPlan] = useState<string>('');

  const sections = [
    {
      title: 'Individual Plans',
      options: [
        {
          label: 'Basic',
          value: 'basic',
          description: '$9/month - Perfect for individuals',
        },
        {
          label: 'Pro',
          value: 'pro',
          description: '$19/month - Advanced features included',
        },
      ],
    },
    {
      title: 'Team Plans',
      options: [
        {
          label: 'Team',
          value: 'team',
          description: '$39/month - Collaboration tools',
        },
        {
          label: 'Enterprise',
          value: 'enterprise',
          description: '$99/month - Full enterprise features',
        },
        {
          label: 'Custom',
          value: 'custom',
          description: 'Contact us for pricing',
          disabled: true,
        },
      ],
    },
  ];

  return (
    <View style={{ gap: 16 }}>
      <Picker
        sections={sections}
        value={plan}
        onValueChange={setPlan}
        placeholder='Select a plan...'
        modalTitle='Subscription Plans'
        searchable
        searchPlaceholder='Search plans...'
        variant='outline'
      />

      {plan && (
        <View
          style={{
            padding: 12,
            backgroundColor: '#f0f9ff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#0284c7',
          }}
        >
          <Text style={{ color: '#0284c7', fontWeight: '500' }}>
            Selected:{' '}
            {
              sections.flatMap((s) => s.options).find((o) => o.value === plan)
                ?.label
            }
          </Text>
        </View>
      )}
    </View>
  );
}
