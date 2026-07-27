import { DatePicker } from '@/components/ui/date-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function DatePickerFormats() {
  const [datetime24, setDateTime24] = useState<Date | undefined>();
  const [datetime12, setDateTime12] = useState<Date | undefined>();

  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text variant='caption' style={{ marginBottom: 8 }}>
          24-Hour Format
        </Text>
        <DatePicker
          mode='datetime'
          value={datetime24}
          onChange={setDateTime24}
          placeholder='Select date and time'
          timeFormat='24'
        />
      </View>

      <View>
        <Text variant='caption' style={{ marginBottom: 8 }}>
          12-Hour Format with AM/PM
        </Text>
        <DatePicker
          mode='datetime'
          value={datetime12}
          onChange={setDateTime12}
          placeholder='Select date and time'
          timeFormat='12'
        />
      </View>
    </View>
  );
}
